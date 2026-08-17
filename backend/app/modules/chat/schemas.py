from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class MessageRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class MessageResponse(BaseModel):
    id: str
    session_id: str
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True


class SessionResponse(BaseModel):
    id: str
    title: str
    created_at: datetime
    updated_at: datetime
    messages: Optional[List[MessageResponse]] = None

    class Config:
        from_attributes = True


class ChatResponse(BaseModel):
    reply: str
    session_id: str


class SessionCreate(BaseModel):
    title: str


class SessionRenameRequest(BaseModel):
    title: str