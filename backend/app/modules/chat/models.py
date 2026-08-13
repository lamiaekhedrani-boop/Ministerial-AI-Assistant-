from datetime import datetime
import uuid

from sqlalchemy import Column, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from app.core.database import Base


def generate_uuid():
    return str(uuid.uuid4())


class ChatSession(Base):

    __tablename__ = "chat_sessions"

    id = Column(
        String(36),
        primary_key=True,
        index=True,
        default=generate_uuid
    )

    user_id = Column(
        String(100),
        nullable=False,
        index=True
    )

    title = Column(
        String(200),
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    messages = relationship(
        "ChatMessage",
        back_populates="session",
        cascade="all, delete-orphan"
    )


class ChatMessage(Base):

    __tablename__ = "chat_messages"

    id = Column(
        String(36),
        primary_key=True,
        index=True,
        default=generate_uuid
    )

    session_id = Column(
        String(36),
        ForeignKey(
            "chat_sessions.id",
            ondelete="CASCADE"
        )
    )

    role = Column(
        String(20),
        nullable=False
    )

    content = Column(
        Text,
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    session = relationship(
        "ChatSession",
        back_populates="messages"
    )