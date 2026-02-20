import structlog
from typing import Dict, Any, List
from .code_extractor import CodeExtractor
from .file_writer import FileWriter
from .docker_runner import DockerRunner
from ..comms.api_client import AliffCommsClient

logger = structlog.get_logger()

class ResponseRouter:
    def __init__(self, config: Dict[str, Any], comms: AliffCommsClient):
        self.config = config
        self.comms = comms
        self.extractor = CodeExtractor()
        self.writer = FileWriter(config["safety"]["allowed_paths"])
        self.runner = DockerRunner()

    async def deploy_package(self, code_text: str, original_msg: Dict[str, Any]):
        """
        Executes the Write -> Docker -> Verify -> Report cycle.
        Returns the report text.
        """
        # 1. Extract & Write
        code_blocks = self.extractor.extract_code_blocks(code_text)
        files_written = []
        
        for block in code_blocks:
            content = block["code"]
            # Try to find path in first line comment
            lines = content.split('\n')
            path = None
            if lines:
                first_line = lines[0].strip()
                # Support "# filename: path" or "## filename: path" or "// filename: path"
                if "filename:" in first_line:
                    parts = first_line.split("filename:", 1)
                    if len(parts) > 1:
                        path = parts[1].strip()
            
            if path:
                try:
                    if self.writer.write_file(path, content):
                        files_written.append(path)
                except ValueError as e:
                    logger.warning("write_blocked", path=path, error=str(e))

        if not files_written:
            return "❌ Deployment Aborted: No valid file paths found in code blocks. Ensure '# filename: path' comments are present."

        # 2. Docker Cycle
        report_lines = ["**DEPLOYMENT REPORT**", f"Files Written: {len(files_written)}"]
        for f in files_written:
            report_lines.append(f"- `{f}`")

        cwd = self.config["paths"]["workspace_root"]
        
        # Cleanup
        try:
            self.runner.run_command(cwd, "docker compose down --remove-orphans")
            # Best effort pruning
            try:
                self.runner.run_command(cwd, "docker system prune -f")
            except:
                pass
        except Exception as e:
            report_lines.append(f"⚠️ Cleanup Warning: {str(e)}")

        # Build
        try:
            build_out = self.runner.run_command(cwd, "docker compose up -d --build")
            report_lines.append("\n**Build Status**:")
            if "Error" in build_out: # Basic check, docker usually outputs to stderr on error
                 report_lines.append("❌ Build Prcess output contained errors.")
                 report_lines.append(f"```\n{build_out[:1000]}\n```")
            else:
                 report_lines.append("✅ Build Command Executed")
        except Exception as e:
            report_lines.append(f"❌ Build Failed Exception: {str(e)}")
            return "\n".join(report_lines)

        # Verify
        try:
            ps_out = self.runner.run_command(cwd, "docker compose ps")
            report_lines.append("\n**Containers**:")
            report_lines.append(f"```\n{ps_out}\n```")
        except:
            report_lines.append("⚠️ Could not verify containers.")

        # Report
        full_report = "\n".join(report_lines)
        
        # Send to CEO
        await self.comms.send_message({
            "to_agent": "2000",
            "subject": f"DEPLOY REPORT: {original_msg.get('subject')}",
            "body": full_report,
            "type": "report",
            "priority": "high",
            "platform": "orchestrator"
        })
        
        return full_report
