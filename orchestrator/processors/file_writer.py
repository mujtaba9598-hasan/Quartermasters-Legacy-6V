import os
from pathlib import Path

class FileWriter:
    def __init__(self, allowed_paths: List[str]):
        self.allowed_paths = [Path(p).resolve() for p in allowed_paths]

    def write_file(self, path_str: str, content: str) -> bool:
        target_path = Path(path_str).resolve()
        
        # Security check: must be within allowed paths
        is_allowed = any(str(target_path).startswith(str(p)) for p in self.allowed_paths)
        if not is_allowed:
            raise ValueError(f"Security: Write prevented to {path_str} - Path not allowed.")

        target_path.parent.mkdir(parents=True, exist_ok=True)
        with open(target_path, "w", encoding="utf-8") as f:
            f.write(content)
        return True
