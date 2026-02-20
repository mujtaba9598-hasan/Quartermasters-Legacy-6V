import subprocess
import structlog

logger = structlog.get_logger()

class DockerRunner:
    def run_command(self, folder: str, command: str) -> str:
        # Security: whitelist specific commands
        allowed_prefixes = [
            "docker compose",
            "docker ps",
            "docker images",
            "docker image prune",
            "docker system prune",
            "docker rmi"
        ]
        
        if not any(command.startswith(prefix) for prefix in allowed_prefixes):
             raise ValueError(f"Security: Command '{command}' not allowed.")

        try:
            result = subprocess.run(
                command, 
                shell=False, # Security: No shell=True
                check=True, 
                cwd=folder, 
                capture_output=True, 
                text=True
            )
            return result.stdout
        except subprocess.CalledProcessError as e:
            logger.error("docker_error", error=e.stderr)
            return f"Error: {e.stderr}"
