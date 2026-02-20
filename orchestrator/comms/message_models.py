from pydantic import BaseModel
from typing import Optional, List, Any

class Message(BaseModel):
    id: str
    from_agent: str
    to_agent: str
    subject: Optional[str] = None
    body: str
    priority: str = "normal"
    status: str = "unread"
    type: str = "directive"
    created_at: str

class InboxResponse(BaseModel):
    messages: List[Message]
