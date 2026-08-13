from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


# ========================================
# REQUÊTE : ENVOYER UN MESSAGE
# ========================================

class MessageRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


# ========================================
# RÉPONSE : MESSAGE
# ========================================

class MessageResponse(BaseModel):
    id: str
    session_id: str
    role: str
    content: str
    created_at: datetime

    class Config:
        from_attributes = True


# ========================================
# RÉPONSE : SESSION
# ========================================

class SessionResponse(BaseModel):
    id: str
    title: str
    created_at: datetime
    updated_at: datetime
    messages: Optional[List[MessageResponse]] = None

    class Config:
        from_attributes = True


# ========================================
# RÉPONSE : CHAT
# ========================================

class ChatResponse(BaseModel):
    reply: str
    session_id: str


# ========================================
# CRÉER UNE SESSION
# ========================================

class SessionCreate(BaseModel):
    title: str


# ========================================
# RENOMMER UNE SESSION
# ========================================

class SessionRenameRequest(BaseModel):
    title: str