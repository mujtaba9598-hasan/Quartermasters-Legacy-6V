import json
from pathlib import Path
from typing import Set, Dict, Any

class StateManager:
    def __init__(self, state_file: str = "orchestrator_state.json"):
        self.state_file = Path(state_file)
        self.processed_messages: Set[str] = set()
        self.failed_messages: Dict[str, int] = {}
        self._load()

    def _load(self):
        if self.state_file.exists():
            try:
                with open(self.state_file, "r") as f:
                    data = json.load(f)
                    self.processed_messages = set(data.get("processed", []))
                    self.failed_messages = data.get("failed", {})
            except Exception:
                # If corrupt, start fresh
                pass

    def _save(self):
        with open(self.state_file, "w") as f:
            json.dump({
                "processed": list(self.processed_messages),
                "failed": self.failed_messages
            }, f)

    def is_processed(self, msg_id: str) -> bool:
        return msg_id in self.processed_messages

    def mark_processed(self, msg_id: str):
        self.processed_messages.add(msg_id)
        if msg_id in self.failed_messages:
            del self.failed_messages[msg_id]
        self._save()

    def record_failure(self, msg_id: str):
        self.failed_messages[msg_id] = self.failed_messages.get(msg_id, 0) + 1
        self._save()

    def get_failure_count(self, msg_id: str) -> int:
        return self.failed_messages.get(msg_id, 0)
