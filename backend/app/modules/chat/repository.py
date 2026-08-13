from datetime import datetime
from sqlalchemy.orm import Session
from app.modules.chat.models import ChatSession, ChatMessage
from typing import List, Optional


class ChatRepository:

    def __init__(self, db: Session):
        self.db = db

    # ========================================
    # CRÉER UNE SESSION
    # ========================================
    def create_session(self, user_id: str, title: str) -> ChatSession:
        session = ChatSession(
            user_id=user_id,
            title=title
        )

        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)

        return session

    # ========================================
    # RÉCUPÉRER UNE SESSION
    # ========================================
    def get_session(
        self,
        session_id: str,
        user_id: str
    ) -> Optional[ChatSession]:

        return (
            self.db.query(ChatSession)
            .filter(
                ChatSession.id == session_id,
                ChatSession.user_id == user_id
            )
            .first()
        )

    # ========================================
    # RÉCUPÉRER LES SESSIONS D'UN UTILISATEUR
    # ========================================
    def get_user_sessions(
        self,
        user_id: str,
        limit: int = 20
    ) -> List[ChatSession]:

        return (
            self.db.query(ChatSession)
            .filter(ChatSession.user_id == user_id)
            .order_by(ChatSession.updated_at.desc())
            .limit(limit)
            .all()
        )

    # ========================================
    # AJOUTER UN MESSAGE
    # ========================================
    def add_message(
        self,
        session_id: str,
        role: str,
        content: str
    ) -> ChatMessage:

        message = ChatMessage(
            session_id=session_id,
            role=role,
            content=content
        )

        self.db.add(message)
        self.db.commit()
        self.db.refresh(message)

        return message

    # ========================================
    # RÉCUPÉRER LES MESSAGES D'UNE SESSION
    # ========================================
    def get_session_messages(
        self,
        session_id: str
    ) -> List[ChatMessage]:

        return (
            self.db.query(ChatMessage)
            .filter(ChatMessage.session_id == session_id)
            .order_by(ChatMessage.created_at.asc())
            .all()
        )

    # ========================================
    # METTRE À JOUR LA DATE DE MODIFICATION
    # ========================================
    def update_session_updated_at(
        self,
        session_id: str
    ):

        session = (
            self.db.query(ChatSession)
            .filter(ChatSession.id == session_id)
            .first()
        )

        if session:
            session.updated_at = datetime.utcnow()
            self.db.commit()

    # ========================================
    # SUPPRIMER UNE SESSION
    # ========================================
    def delete_session(
        self,
        session_id: str,
        user_id: str
    ) -> bool:

        session = self.get_session(
            session_id,
            user_id
        )

        if not session:
            return False

        self.db.delete(session)
        self.db.commit()

        return True

    # ========================================
    # RENOMMER UNE SESSION
    # ========================================
    def rename_session(
        self,
        session_id: str,
        user_id: str,
        new_title: str
    ) -> Optional[ChatSession]:

        session = self.get_session(
            session_id,
            user_id
        )

        if not session:
            return None

        session.title = new_title
        session.updated_at = datetime.utcnow()

        self.db.commit()
        self.db.refresh(session)

        return session