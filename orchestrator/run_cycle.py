"""
Quartermasters Orchestrator — Minimal Cycle Runner
Polls CEO inbox for Gemini deliveries, extracts code, writes to disk, runs Docker, reports.
"""
import os
import re
import json
import time
import subprocess
import sys

# Fix Windows encoding
os.environ["PYTHONIOENCODING"] = "utf-8"

# --- Config ---
API_BASE = "https://aliffsolutions.com/api/v1/agent-comms"
CEO_ID = "2000"
CEO_KEY = "sNfOVUZ31Suwge3gLTCsj6PygtdI0TJZ"
ENGINEER_ID = "2002"
WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ALLOWED_ROOTS = [
    os.path.join(WORKSPACE, "quartermasters-nexus", "src"),
    os.path.join(WORKSPACE, "quartermasters-nexus", "public"),
    os.path.join(WORKSPACE, ".claude"),
]
POLL_INTERVAL = 30  # seconds
PROCESSED_FILE = os.path.join(os.path.dirname(__file__), "processed_ids.json")

# --- HTTP (using subprocess curl to avoid dependency issues) ---
def api_get(endpoint):
    cmd = [
        "curl", "-s", f"{API_BASE}{endpoint}",
        "-H", f"X-Agent-Id: {CEO_ID}",
        "-H", f"X-Agent-Key: {CEO_KEY}"
    ]
    result = subprocess.run(cmd, capture_output=True, timeout=30)
    return json.loads(result.stdout.decode("utf-8", errors="replace"))

def api_post(endpoint, data):
    tmp = os.path.join(os.path.dirname(__file__), "_tmp_post.json")
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False)
    cmd = [
        "curl", "-s", "-X", "POST", f"{API_BASE}{endpoint}",
        "-H", f"X-Agent-Id: {CEO_ID}",
        "-H", f"X-Agent-Key: {CEO_KEY}",
        "-H", "Content-Type: application/json",
        "-d", f"@{tmp}"
    ]
    result = subprocess.run(cmd, capture_output=True, timeout=30)
    os.remove(tmp)
    return json.loads(result.stdout.decode("utf-8", errors="replace"))

def api_patch(endpoint, data):
    cmd = [
        "curl", "-s", "-X", "PATCH", f"{API_BASE}{endpoint}",
        "-H", f"X-Agent-Id: {CEO_ID}",
        "-H", f"X-Agent-Key: {CEO_KEY}",
        "-H", "Content-Type: application/json",
        "-d", json.dumps(data)
    ]
    result = subprocess.run(cmd, capture_output=True, timeout=30)
    return json.loads(result.stdout.decode("utf-8", errors="replace"))

# --- State ---
def load_processed():
    if os.path.exists(PROCESSED_FILE):
        with open(PROCESSED_FILE, "r") as f:
            return set(json.load(f))
    return set()

def save_processed(ids):
    with open(PROCESSED_FILE, "w") as f:
        json.dump(list(ids), f)

# --- Code Extraction ---
def extract_code_blocks(text):
    """Extract fenced code blocks with optional file paths from message body."""
    blocks = []
    # Pattern: ```lang\n// filepath: path/to/file\ncode\n```
    # Or: ## path/to/file\n```lang\ncode\n```
    pattern = r'```[\w]*\n(.*?)```'
    matches = re.findall(pattern, text, re.DOTALL)

    for code in matches:
        filepath = None
        lines = code.strip().split("\n")
        # Check first line for filepath hints
        for hint in ["// filepath:", "# filepath:", "// file:", "# file:"]:
            if lines[0].lower().startswith(hint.lower()):
                filepath = lines[0].split(":", 1)[1].strip()
                code = "\n".join(lines[1:])
                break
        blocks.append({"filepath": filepath, "code": code.strip()})

    # Also check for ## filename patterns before code blocks
    header_pattern = r'##\s+([^\n]+\.(?:tsx?|jsx?|css|html|json|ya?ml|py|md))\s*\n```[\w]*\n(.*?)```'
    header_matches = re.findall(header_pattern, text, re.DOTALL)
    for fp, code in header_matches:
        blocks.append({"filepath": fp.strip(), "code": code.strip()})

    return blocks

# --- File Writer ---
def is_path_allowed(filepath):
    abs_path = os.path.abspath(os.path.join(WORKSPACE, filepath))
    return any(abs_path.startswith(root) for root in ALLOWED_ROOTS)

def write_file(filepath, content):
    abs_path = os.path.abspath(os.path.join(WORKSPACE, filepath))
    if not is_path_allowed(filepath):
        return f"BLOCKED: {filepath} (outside allowed paths)"
    os.makedirs(os.path.dirname(abs_path), exist_ok=True)
    with open(abs_path, "w", encoding="utf-8") as f:
        f.write(content)
    return f"WRITTEN: {filepath} ({len(content)} bytes)"

# --- Docker ---
def run_docker_cycle():
    results = []
    compose_file = os.path.join(WORKSPACE, "docker-compose.yml")
    if not os.path.exists(compose_file):
        return ["SKIP: No docker-compose.yml found"]

    commands = [
        ("Stopping containers", ["docker", "compose", "-f", compose_file, "down", "--remove-orphans"]),
        ("Pruning old images", ["docker", "image", "prune", "-f"]),
        ("Building and starting", ["docker", "compose", "-f", compose_file, "up", "-d", "--build"]),
        ("Checking containers", ["docker", "compose", "-f", compose_file, "ps"]),
    ]

    for label, cmd in commands:
        try:
            r = subprocess.run(cmd, capture_output=True, timeout=120)
            status = "OK" if r.returncode == 0 else f"FAIL (exit {r.returncode})"
            results.append(f"{label}: {status}")
            if r.returncode != 0 and r.stderr:
                results.append(f"  stderr: {r.stderr.decode('utf-8', errors='replace')[:200]}")
        except subprocess.TimeoutExpired:
            results.append(f"{label}: TIMEOUT")
        except Exception as e:
            results.append(f"{label}: ERROR ({e})")

    # Health check
    try:
        r = subprocess.run(
            ["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}", "http://localhost:3000"],
            capture_output=True, timeout=30
        )
        results.append(f"Health check localhost:3000: HTTP {r.stdout.decode('utf-8', errors='replace')}")
    except Exception as e:
        results.append(f"Health check: ERROR ({e})")

    return results

# --- Report ---
def send_report(subject, body):
    return api_post("/send", {
        "to_agent": CEO_ID,
        "subject": subject,
        "body": body,
        "type": "report",
        "priority": "normal",
        "platform": "orchestrator"
    })

# --- Main Cycle ---
def run_one_cycle():
    processed = load_processed()
    print(f"\n[{time.strftime('%H:%M:%S')}] Polling CEO inbox...")

    try:
        data = api_get(f"/inbox/{CEO_ID}")
    except Exception as e:
        print(f"  ERROR polling inbox: {e}")
        return False

    messages = data.get("messages", [])
    new_deliveries = [
        m for m in messages
        if m["from_agent"] == ENGINEER_ID
        and m["status"] == "unread"
        and m["id"] not in processed
        and "DELIVERY" in m.get("subject", "").upper()
    ]

    if not new_deliveries:
        print(f"  No new deliveries from Gemini. ({len(messages)} total messages)")
        return False

    print(f"  Found {len(new_deliveries)} new delivery(ies) from Gemini!")

    all_files_written = []
    all_errors = []

    for msg in new_deliveries:
        print(f"\n  Processing: {msg['subject']}")
        body = msg.get("body", "")

        # Extract code blocks
        blocks = extract_code_blocks(body)

        if not blocks:
            # If no fenced code blocks, the entire body might be a single file
            # Check if subject hints at a filepath
            subject = msg.get("subject", "")
            if ":" in subject:
                hint = subject.split(":", 1)[1].strip().replace(" ", "")
                if "." in hint:
                    # Looks like a filepath
                    result = write_file(hint, body)
                    all_files_written.append(result)
                    print(f"    {result}")
                else:
                    all_errors.append(f"No code blocks found in: {subject}")
                    print(f"    WARNING: No code blocks found")
            else:
                all_errors.append(f"No code blocks found in: {subject}")
                print(f"    WARNING: No code blocks found")
        else:
            for block in blocks:
                if block["filepath"]:
                    result = write_file(block["filepath"], block["code"])
                    all_files_written.append(result)
                    print(f"    {result}")
                else:
                    all_files_written.append(f"SKIPPED: code block with no filepath ({len(block['code'])} bytes)")
                    print(f"    SKIPPED: code block with no filepath")

        # Mark processed
        processed.add(msg["id"])
        try:
            api_patch(f"/{msg['id']}/status", {"status": "resolved"})
        except:
            pass

    save_processed(processed)

    # Docker rebuild if any files were written
    docker_results = []
    written_count = sum(1 for f in all_files_written if f.startswith("WRITTEN"))
    if written_count > 0:
        print(f"\n  Running Docker rebuild cycle ({written_count} files written)...")
        docker_results = run_docker_cycle()
        for r in docker_results:
            print(f"    {r}")

    # Build report
    report_lines = [
        f"Orchestrator Cycle Report — {time.strftime('%Y-%m-%d %H:%M:%S')}",
        f"Deliveries processed: {len(new_deliveries)}",
        "",
        "== FILES ==",
    ]
    report_lines.extend(all_files_written)
    if all_errors:
        report_lines.append("\n== WARNINGS ==")
        report_lines.extend(all_errors)
    if docker_results:
        report_lines.append("\n== DOCKER ==")
        report_lines.extend(docker_results)

    report_body = "\n".join(report_lines)
    print(f"\n  Sending report to CEO inbox...")
    send_report("CYCLE REPORT: Orchestrator Run Complete", report_body)
    print(f"  Report sent.")

    return True

def main():
    print("=" * 60)
    print("  QUARTERMASTERS ORCHESTRATOR — Minimal Cycle Runner")
    print(f"  Workspace: {WORKSPACE}")
    print(f"  Polling interval: {POLL_INTERVAL}s")
    print(f"  Watching for deliveries from agent {ENGINEER_ID}")
    print("=" * 60)
    print("\nType Ctrl+C to stop.\n")

    try:
        while True:
            found = run_one_cycle()
            if found:
                print(f"\n[CYCLE COMPLETE] Sleeping {POLL_INTERVAL}s before next poll...")
            else:
                print(f"  Sleeping {POLL_INTERVAL}s...")
            time.sleep(POLL_INTERVAL)
    except KeyboardInterrupt:
        print("\n\nOrchestrator stopped by user.")
        sys.exit(0)

if __name__ == "__main__":
    main()
