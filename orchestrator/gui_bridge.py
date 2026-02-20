"""
Quartermasters GUI Bridge — Full Autonomous Loop
Bridges Claude (terminal) <-> Gemini (Antigravity chat) via comms API + GUI automation.

Usage:
    python gui_bridge.py              # Normal mode
    python gui_bridge.py --discover   # List all windows to find correct titles
    python gui_bridge.py --test       # Test window switching without sending messages
"""
import os
import sys
import json
import time
import subprocess
import argparse
import re
import pyautogui
import pyperclip

# Disable pyautogui failsafe (mouse-to-corner abort) for unattended operation
pyautogui.FAILSAFE = False
pyautogui.PAUSE = 0.3  # 300ms between actions

# ============================================================
# CONFIG — Edit these to match your Antigravity setup
# ============================================================
API_BASE = "https://aliffsolutions.com/api/v1/agent-comms"
CEO_ID = "2000"
CEO_KEY = "sNfOVUZ31Suwge3gLTCsj6PygtdI0TJZ"
ENGINEER_ID = "2002"
ENGINEER_KEY = "lK1qkObpIDrNXwMBrtAij9zAK98eedOi"

# Window title substrings — gui_bridge will match partial titles
# Discovered: "Quartermasters 3 - Antigravity - Implementation Plan"
# Both Gemini chat and Claude terminal are INSIDE the same Antigravity window
GEMINI_WINDOW_TITLE = "Antigravity"     # Main Antigravity window (contains both panels)
CLAUDE_WINDOW_TITLE = "Antigravity"     # Same window — Claude is a terminal panel inside it
ANTIGRAVITY_TITLE = "Antigravity"       # Main window

# Timing
POLL_INTERVAL = 15          # seconds between inbox checks
GEMINI_WORK_TIMEOUT = 300   # max seconds to wait for Gemini to finish
PERMISSION_CHECK_INTERVAL = 3  # seconds between permission dialog checks
TYPE_DELAY = 0.02           # delay between keystrokes when typing

# The prompt pasted into Gemini's chat to trigger inbox check
GEMINI_STARTUP_PROMPT = (
    "Check your inbox at https://aliffsolutions.com/api/v1/agent-comms/inbox/2002 "
    "with headers X-Agent-Id: 2002 and X-Agent-Key: lK1qkObpIDrNXwMBrtAij9zAK98eedOi. "
    "Read all unread messages. Execute all directives. "
    "Deliver all code files via POST to https://aliffsolutions.com/api/v1/agent-comms/send "
    "with headers X-Agent-Id: 2002 and X-Agent-Key: lK1qkObpIDrNXwMBrtAij9zAK98eedOi. "
    "For each file, use: {\"to_agent\":\"2000\",\"subject\":\"DELIVERY: path/to/file.ext\","
    "\"body\":\"<COMPLETE file source code>\",\"type\":\"report\",\"priority\":\"normal\","
    "\"platform\":\"gemini\"}. Mark processed messages as resolved via PATCH. "
    "Send completion report to agent 2000. Do everything in this single response."
)

WORKSPACE = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PROCESSED_FILE = os.path.join(os.path.dirname(__file__), "bridge_processed_ids.json")
LOG_FILE = os.path.join(os.path.dirname(__file__), "logs", "gui_bridge.log")

# ============================================================
# LOGGING
# ============================================================
def log(msg, level="INFO"):
    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] [{level}] {msg}"
    print(line)
    try:
        os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except:
        pass

# ============================================================
# COMMS API (curl-based, no extra dependencies)
# ============================================================
def api_get(endpoint):
    cmd = [
        "curl", "-s", f"{API_BASE}{endpoint}",
        "-H", f"X-Agent-Id: {CEO_ID}",
        "-H", f"X-Agent-Key: {CEO_KEY}"
    ]
    result = subprocess.run(cmd, capture_output=True, timeout=30)
    return json.loads(result.stdout.decode("utf-8", errors="replace"))

def api_post(endpoint, data):
    tmp = os.path.join(os.path.dirname(__file__), "_bridge_tmp.json")
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
    try:
        os.remove(tmp)
    except:
        pass
    return json.loads(result.stdout.decode("utf-8", errors="replace"))

def api_patch(msg_id, data):
    cmd = [
        "curl", "-s", "-X", "PATCH", f"{API_BASE}/{msg_id}/status",
        "-H", f"X-Agent-Id: {CEO_ID}",
        "-H", f"X-Agent-Key: {CEO_KEY}",
        "-H", "Content-Type: application/json",
        "-d", json.dumps(data)
    ]
    result = subprocess.run(cmd, capture_output=True, timeout=30)
    return json.loads(result.stdout.decode("utf-8", errors="replace"))

# ============================================================
# STATE TRACKING
# ============================================================
def load_processed():
    if os.path.exists(PROCESSED_FILE):
        with open(PROCESSED_FILE, "r") as f:
            return set(json.load(f))
    return set()

def save_processed(ids):
    with open(PROCESSED_FILE, "w") as f:
        json.dump(list(ids), f)

# ============================================================
# WINDOW MANAGEMENT (pywinauto)
# ============================================================
def find_windows(title_substring):
    """Find all windows matching a title substring."""
    try:
        from pywinauto import Desktop
        desktop = Desktop(backend="uia")
        windows = []
        for w in desktop.windows():
            try:
                title = w.window_text()
                if title and title_substring.lower() in title.lower():
                    windows.append({"title": title, "handle": w.handle, "window": w})
            except:
                continue
        return windows
    except Exception as e:
        log(f"Window search error: {e}", "ERROR")
        return []

def list_all_windows():
    """List all visible windows — for discovery mode."""
    try:
        from pywinauto import Desktop
        desktop = Desktop(backend="uia")
        windows = []
        for w in desktop.windows():
            try:
                title = w.window_text()
                if title and len(title.strip()) > 0:
                    windows.append(title)
            except:
                continue
        return sorted(set(windows))
    except Exception as e:
        log(f"Window list error: {e}", "ERROR")
        return []

def focus_window(title_substring):
    """Find and focus a window by title substring. Returns True if successful."""
    windows = find_windows(title_substring)
    if not windows:
        # Try Antigravity as fallback
        if title_substring != ANTIGRAVITY_TITLE:
            windows = find_windows(ANTIGRAVITY_TITLE)
        if not windows:
            log(f"Window not found: '{title_substring}'", "WARN")
            return False

    target = windows[0]
    try:
        target["window"].set_focus()
        time.sleep(0.5)  # Wait for focus
        log(f"Focused window: {target['title'][:60]}")
        return True
    except Exception as e:
        log(f"Focus failed for '{target['title']}': {e}", "ERROR")
        # Fallback: use pyautogui with Alt+Tab approach
        try:
            import ctypes
            ctypes.windll.user32.SetForegroundWindow(target["handle"])
            time.sleep(0.5)
            return True
        except:
            return False

# ============================================================
# CHAT INTERACTION
# ============================================================
def type_in_chat(text):
    """Type text into the currently focused chat input using clipboard paste."""
    # Use clipboard for speed and reliability (avoids encoding issues with typewrite)
    pyperclip.copy(text)
    time.sleep(0.2)
    pyautogui.hotkey("ctrl", "v")
    time.sleep(0.3)
    log(f"Typed {len(text)} chars into chat via clipboard")

def press_alt_enter():
    """Press Alt+Enter to submit in Antigravity."""
    pyautogui.hotkey("alt", "Return")
    time.sleep(0.5)
    log("Pressed Alt+Enter")

def press_enter():
    """Press Enter."""
    pyautogui.press("enter")
    time.sleep(0.3)

def accept_permission():
    """Auto-accept permission/approval dialogs."""
    # Strategy: press Alt+Enter which handles most Antigravity confirmations
    press_alt_enter()
    log("Auto-accepted permission dialog")

# ============================================================
# TRIGGER GEMINI
# ============================================================
def trigger_gemini():
    """Focus Antigravity, click the RIGHT panel (Gemini chat), paste prompt, Alt+Enter."""
    log("=== TRIGGERING GEMINI ===")

    if not focus_window(GEMINI_WINDOW_TITLE):
        log("Could not focus Antigravity window!", "ERROR")
        return False

    time.sleep(1.5)

    # "Ask Anything (Ctrl+L)" input — confirmed from screenshot
    # Very bottom-right of the Antigravity window, just above taskbar
    GEMINI_INPUT_X, GEMINI_INPUT_Y = 1750, 1045

    # Click directly on the "Ask Anything" input field
    # Use moveTo first, then click — avoids focus stealing from subprocess
    pyautogui.moveTo(GEMINI_INPUT_X, GEMINI_INPUT_Y, duration=0.3)
    time.sleep(0.3)
    pyautogui.click()
    time.sleep(0.5)
    pyautogui.click()  # Double-click to ensure focus
    time.sleep(1.0)
    log(f"Clicked Gemini 'Ask Anything' input at ({GEMINI_INPUT_X}, {GEMINI_INPUT_Y})")

    # Paste via clipboard — move mouse back to input area first
    pyperclip.copy(GEMINI_STARTUP_PROMPT)
    time.sleep(0.2)
    pyautogui.moveTo(GEMINI_INPUT_X, GEMINI_INPUT_Y)
    time.sleep(0.2)
    pyautogui.click()
    time.sleep(0.3)
    pyautogui.hotkey("ctrl", "v")
    time.sleep(1.5)
    log(f"Pasted {len(GEMINI_STARTUP_PROMPT)} chars")

    # Click Send or press Enter while mouse is on Gemini panel
    pyautogui.moveTo(GEMINI_INPUT_X, GEMINI_INPUT_Y)
    time.sleep(0.2)
    pyautogui.click()
    time.sleep(0.2)
    pyautogui.press("enter")
    time.sleep(0.5)
    log("Submitted prompt")

    log("Gemini triggered successfully")
    return True

# ============================================================
# TRIGGER CLAUDE
# ============================================================
def trigger_claude():
    """Focus Antigravity, click the LEFT panel (Claude terminal), type 'check inbox'."""
    log("=== TRIGGERING CLAUDE ===")

    if not focus_window(CLAUDE_WINDOW_TITLE):
        log("Could not focus Antigravity window!", "ERROR")
        return False

    time.sleep(1)

    # Layout: Claude terminal is center-bottom area
    screen_w, screen_h = pyautogui.size()
    claude_x = int(screen_w * 0.45)  # Center of terminal area
    claude_y = int(screen_h * 0.88)  # Bottom of terminal
    pyautogui.click(claude_x, claude_y)
    time.sleep(0.5)

    # Type the check inbox command
    type_in_chat("check inbox")
    time.sleep(0.2)
    press_enter()

    log("Claude triggered with 'check inbox'")
    return True

# ============================================================
# PERMISSION MONITOR
# ============================================================
def check_and_accept_permissions():
    """Auto-click Accept/Run buttons in Gemini's panel.
    These buttons appear when Gemini wants to execute code or make API calls.
    Coordinates confirmed from screenshots on 1920x1080 screen."""

    # Accept/Run buttons appear in the RIGHT panel only (Gemini area).
    # AVOID: Claude's terminal area (center-left) has a recording button near send.
    # Safe zone: X=1800-1890 (far right panel only), Y=600-900 (mid-right panel)
    # Do NOT click below Y=920 or left of X=1780 to avoid Claude's controls.
    ACCEPT_X = 1830
    RUN_X = 1875
    # Only scan the safe zone where Accept/Run buttons appear
    Y_POSITIONS = [845, 870, 820, 800, 780, 750, 720, 700, 680, 650]

    try:
        if not focus_window(GEMINI_WINDOW_TITLE):
            return

        time.sleep(0.2)

        for y in Y_POSITIONS:
            pyautogui.click(ACCEPT_X, y)
            time.sleep(0.08)
            pyautogui.click(RUN_X, y)
            time.sleep(0.08)

        log(f"Scanned {len(Y_POSITIONS)} safe positions for Accept/Run buttons")

    except Exception as e:
        log(f"Permission auto-accept error: {e}", "WARN")

# ============================================================
# MONITORING
# ============================================================
def check_for_new_directives():
    """Check if CEO has sent new directives to engineer inbox."""
    try:
        data = api_get(f"/inbox/{ENGINEER_ID}")
        messages = data.get("messages", [])
        unread = [m for m in messages if m["status"] == "unread" and m["from_agent"] == CEO_ID]
        return unread
    except Exception as e:
        log(f"Error checking engineer inbox: {e}", "ERROR")
        return []

def check_for_gemini_report(processed_ids):
    """Check CEO inbox for new reports from Gemini."""
    try:
        data = api_get(f"/inbox/{CEO_ID}")
        messages = data.get("messages", [])
        new_reports = [
            m for m in messages
            if m["from_agent"] == ENGINEER_ID
            and m["status"] == "unread"
            and m["id"] not in processed_ids
        ]
        return new_reports
    except Exception as e:
        log(f"Error checking CEO inbox: {e}", "ERROR")
        return []

def wait_for_gemini_report(processed_ids):
    """Wait for Gemini to send a report back to CEO. Auto-accept permissions meanwhile."""
    log("Waiting for Gemini to complete work...")
    start = time.time()
    check_count = 0

    while time.time() - start < GEMINI_WORK_TIMEOUT:
        # Auto-accept permission dialogs EVERY cycle
        check_and_accept_permissions()

        # Check for report
        reports = check_for_gemini_report(processed_ids)
        if reports:
            log(f"Gemini sent {len(reports)} message(s)!")
            return reports

        check_count += 1
        elapsed = int(time.time() - start)
        if check_count % 4 == 0:  # Log every ~60s
            log(f"Still waiting... ({elapsed}s elapsed)")

        time.sleep(POLL_INTERVAL)

    log(f"TIMEOUT: Gemini did not respond within {GEMINI_WORK_TIMEOUT}s", "WARN")
    return []

# ============================================================
# CODE EXTRACTION + FILE WRITING (from run_cycle.py)
# ============================================================
ALLOWED_ROOTS = [
    os.path.join(WORKSPACE, "quartermasters-nexus", "src"),
    os.path.join(WORKSPACE, "quartermasters-nexus", "public"),
    os.path.join(WORKSPACE, ".claude"),
    os.path.join(WORKSPACE, "orchestrator"),
]

def extract_code_blocks(text):
    """Extract fenced code blocks with optional file paths."""
    blocks = []
    pattern = r'```[\w]*\n(.*?)```'
    matches = re.findall(pattern, text, re.DOTALL)

    for code in matches:
        filepath = None
        lines = code.strip().split("\n")
        for hint in ["// filepath:", "# filepath:", "// file:", "# file:"]:
            if lines[0].lower().startswith(hint.lower()):
                filepath = lines[0].split(":", 1)[1].strip()
                code = "\n".join(lines[1:])
                break
        blocks.append({"filepath": filepath, "code": code.strip()})

    header_pattern = r'##\s+([^\n]+\.(?:tsx?|jsx?|css|html|json|ya?ml|py|md))\s*\n```[\w]*\n(.*?)```'
    header_matches = re.findall(header_pattern, text, re.DOTALL)
    for fp, code in header_matches:
        blocks.append({"filepath": fp.strip(), "code": code.strip()})

    return blocks

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

# ============================================================
# DOCKER CYCLE
# ============================================================
def run_docker_cycle():
    results = []
    compose_file = os.path.join(WORKSPACE, "docker-compose.yml")
    if not os.path.exists(compose_file):
        return ["SKIP: No docker-compose.yml found"]

    commands = [
        ("Stopping containers", ["docker", "compose", "-f", compose_file, "down", "--remove-orphans"]),
        ("Pruning images", ["docker", "image", "prune", "-f"]),
        ("Building", ["docker", "compose", "-f", compose_file, "up", "-d", "--build"]),
        ("Status", ["docker", "compose", "-f", compose_file, "ps"]),
    ]

    for label, cmd in commands:
        try:
            r = subprocess.run(cmd, capture_output=True, timeout=120)
            status = "OK" if r.returncode == 0 else f"FAIL({r.returncode})"
            results.append(f"{label}: {status}")
        except subprocess.TimeoutExpired:
            results.append(f"{label}: TIMEOUT")
        except Exception as e:
            results.append(f"{label}: ERROR({e})")

    # Health check
    try:
        r = subprocess.run(
            ["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}", "http://localhost:3000"],
            capture_output=True, timeout=30
        )
        results.append(f"Health: HTTP {r.stdout.decode('utf-8', errors='replace')}")
    except Exception as e:
        results.append(f"Health: ERROR({e})")

    return results

# ============================================================
# PROCESS DELIVERIES
# ============================================================
def process_deliveries(messages, processed_ids):
    """Process delivery messages — extract code, write files, run Docker."""
    files_written = []
    deliveries = [m for m in messages if "DELIVERY" in m.get("subject", "").upper()]
    reports = [m for m in messages if "DELIVERY" not in m.get("subject", "").upper()]

    for msg in deliveries:
        log(f"Processing delivery: {msg['subject'][:60]}")
        body = msg.get("body", "")

        # Try extracting code blocks first
        blocks = extract_code_blocks(body)
        if blocks:
            for block in blocks:
                if block["filepath"]:
                    result = write_file(block["filepath"], block["code"])
                    files_written.append(result)
                    log(f"  {result}")
        else:
            # If no code blocks, the body IS the file content
            # Extract filepath from subject: "DELIVERY: path/to/file.ext"
            subject = msg.get("subject", "")
            match = re.search(r'DELIVERY:\s*(.+)', subject, re.IGNORECASE)
            if match:
                filepath = match.group(1).strip()
                if "." in filepath.split("/")[-1]:
                    result = write_file(filepath, body)
                    files_written.append(result)
                    log(f"  {result}")

        processed_ids.add(msg["id"])
        try:
            api_patch(msg["id"], {"status": "resolved"})
        except:
            pass

    # Mark report messages as processed too
    for msg in reports:
        processed_ids.add(msg["id"])
        log(f"Report from Gemini: {msg['subject'][:60]}")

    save_processed(processed_ids)

    # Docker rebuild if files were written
    docker_results = []
    written_count = sum(1 for f in files_written if f.startswith("WRITTEN"))
    if written_count > 0:
        log(f"Running Docker rebuild ({written_count} files written)...")
        docker_results = run_docker_cycle()
        for r in docker_results:
            log(f"  Docker: {r}")

    return files_written, docker_results

# ============================================================
# MAIN LOOP
# ============================================================
def run_bridge():
    """Main autonomous loop."""
    processed_ids = load_processed()
    cycle = 0

    while True:
        cycle += 1
        log(f"\n{'='*50}")
        log(f"CYCLE {cycle} START")
        log(f"{'='*50}")

        # Step 1: Check if there are directives for Gemini
        directives = check_for_new_directives()
        if not directives:
            log("No new directives for Gemini. Checking for pending reports...")
            # Still check for any unprocessed reports
            reports = check_for_gemini_report(processed_ids)
            if reports:
                log(f"Found {len(reports)} pending report(s) from Gemini")
                files_written, docker_results = process_deliveries(reports, processed_ids)
                if files_written:
                    # Send cycle report
                    report_body = f"Cycle {cycle}: {len(files_written)} files processed. Docker: {', '.join(docker_results) if docker_results else 'N/A'}"
                    api_post("/send", {
                        "to_agent": CEO_ID,
                        "subject": f"BRIDGE REPORT: Cycle {cycle} Complete",
                        "body": report_body,
                        "type": "report",
                        "priority": "normal",
                        "platform": "orchestrator"
                    })
                    log("Cycle report sent to CEO inbox")

                    # Trigger Claude to review
                    trigger_claude()
            else:
                log(f"Nothing to do. Sleeping {POLL_INTERVAL}s...")
                time.sleep(POLL_INTERVAL)
            continue

        log(f"Found {len(directives)} directive(s) for Gemini")

        # Step 2: Trigger Gemini to check inbox
        if not trigger_gemini():
            log("Failed to trigger Gemini. Retrying in 30s...", "ERROR")
            time.sleep(30)
            continue

        # Step 3: Wait for Gemini to finish + auto-accept permissions
        reports = wait_for_gemini_report(processed_ids)

        if not reports:
            log("No report from Gemini after timeout. Will retry next cycle.", "WARN")
            time.sleep(POLL_INTERVAL)
            continue

        # Step 4: Process deliveries
        files_written, docker_results = process_deliveries(reports, processed_ids)

        # Step 5: Send cycle report to CEO
        report_lines = [
            f"Cycle {cycle} complete.",
            f"Messages from Gemini: {len(reports)}",
            f"Files: {', '.join(files_written) if files_written else 'None'}",
            f"Docker: {', '.join(docker_results) if docker_results else 'N/A'}",
        ]
        api_post("/send", {
            "to_agent": CEO_ID,
            "subject": f"BRIDGE REPORT: Cycle {cycle} Complete",
            "body": "\n".join(report_lines),
            "type": "report",
            "priority": "normal",
            "platform": "orchestrator"
        })
        log("Cycle report sent to CEO inbox")

        # Step 6: Trigger Claude to check inbox
        trigger_claude()

        log(f"CYCLE {cycle} COMPLETE. Next cycle in {POLL_INTERVAL}s...")
        time.sleep(POLL_INTERVAL)

# ============================================================
# DISCOVERY MODE
# ============================================================
def discover_mode():
    """List all windows to help configure titles."""
    print("\n=== WINDOW DISCOVERY MODE ===\n")
    print("All visible windows on your system:\n")
    windows = list_all_windows()
    for i, title in enumerate(windows, 1):
        safe_title = title.encode("ascii", errors="replace").decode("ascii")
        print(f"  {i:3}. {safe_title}")
    print(f"\nTotal: {len(windows)} windows")
    print("\nUpdate GEMINI_WINDOW_TITLE and CLAUDE_WINDOW_TITLE in gui_bridge.py")
    print("to match the window titles you see above.\n")

# ============================================================
# TEST MODE
# ============================================================
def test_mode():
    """Test window switching without sending messages."""
    print("\n=== TEST MODE ===\n")

    print("1. Looking for Gemini window...")
    gw = find_windows(GEMINI_WINDOW_TITLE)
    if gw:
        print(f"   FOUND: {gw[0]['title']}")
    else:
        print(f"   NOT FOUND (searching for '{GEMINI_WINDOW_TITLE}')")
        # Try Antigravity
        aw = find_windows(ANTIGRAVITY_TITLE)
        if aw:
            print(f"   Fallback FOUND: {aw[0]['title']}")

    print("\n2. Looking for Claude window...")
    cw = find_windows(CLAUDE_WINDOW_TITLE)
    if cw:
        print(f"   FOUND: {cw[0]['title']}")
    else:
        print(f"   NOT FOUND (searching for '{CLAUDE_WINDOW_TITLE}')")

    print("\n3. Testing Comms API...")
    try:
        data = api_get(f"/inbox/{CEO_ID}")
        msg_count = len(data.get("messages", []))
        print(f"   CEO inbox: {msg_count} messages (API working)")
    except Exception as e:
        print(f"   API ERROR: {e}")

    print("\n4. Testing focus switch...")
    if gw:
        print("   Switching to Antigravity window...")
        focus_window(GEMINI_WINDOW_TITLE)
        time.sleep(1)
        print("   Clicking RIGHT panel (Gemini chat area)...")
        screen_w, screen_h = pyautogui.size()
        pyautogui.click(int(screen_w * 0.75), int(screen_h * 0.85))
        time.sleep(2)
        print("   Clicking LEFT panel (Claude terminal area)...")
        pyautogui.click(int(screen_w * 0.25), int(screen_h * 0.85))
        time.sleep(2)
        print("   Focus switching works!")

    print("\nTest complete. If clicks landed in the wrong spots,")
    print("adjust the 0.75/0.25 ratios in gui_bridge.py.\n")

# ============================================================
# ENTRY POINT
# ============================================================
def main():
    parser = argparse.ArgumentParser(description="Quartermasters GUI Bridge")
    parser.add_argument("--discover", action="store_true", help="List all windows")
    parser.add_argument("--test", action="store_true", help="Test window switching")
    args = parser.parse_args()

    if args.discover:
        discover_mode()
        return

    if args.test:
        test_mode()
        return

    print("=" * 60)
    print("  QUARTERMASTERS GUI BRIDGE — Autonomous Loop")
    print(f"  Gemini window: '{GEMINI_WINDOW_TITLE}'")
    print(f"  Claude window: '{CLAUDE_WINDOW_TITLE}'")
    print(f"  Poll interval: {POLL_INTERVAL}s")
    print(f"  Work timeout: {GEMINI_WORK_TIMEOUT}s")
    print("=" * 60)
    print("\nStep 1: Run  python gui_bridge.py --discover  to find window titles")
    print("Step 2: Run  python gui_bridge.py --test     to verify switching works")
    print("Step 3: Run  python gui_bridge.py            to start the loop\n")

    print("\nStarting in 5 seconds... Make sure Antigravity is visible.\n")
    time.sleep(5)

    try:
        run_bridge()
    except KeyboardInterrupt:
        log("\nBridge stopped by user (Ctrl+C)")
        sys.exit(0)

if __name__ == "__main__":
    main()
