import json
import structlog
from pathlib import Path
from datetime import datetime
from typing import Dict, Any

logger = structlog.get_logger()

class AuditTrail:
    def __init__(self, log_path: str):
        self.log_path = Path(log_path)
        self.log_path.parent.mkdir(parents=True, exist_ok=True)

    async def log_event(self, event_type: str, details: Dict[str, Any]):
        entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "event": event_type,
            "details": details
        }
        with open(self.log_path, "a", encoding="utf-8") as f:
            f.write(json.dumps(entry) + "\n")
        
        logger.info(event_type, **details)
