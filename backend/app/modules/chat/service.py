from sqlalchemy.orm import Session
from typing import Optional

from app.modules.chat.repository import ChatRepository
from app.modules.chat.schemas import ChatResponse
from app.modules.rag.service import rag_service

class ChatService:

    def __init__(self, db: Session):
        self.db = db
        self.repo = ChatRepository(db)
        self.rag = rag_service

    async def process_message(
        self,
        user_id: str,
        message: str,
        session_id: Optional[str] = None
    ) -> ChatResponse:
        
        message = message.strip()

        if not message:
            raise ValueError("Le message ne peut pas être vide")

        if not session_id:
            # Utiliser le début du message comme titre de session
            title = message[:40] + "..." if len(message) > 40 else message
            
            session = self.repo.create_session(
                user_id=user_id,
                title=title
            )
            session_id = session.id
        else:
            session = self.repo.get_session(
                session_id=session_id,
                user_id=user_id
            )
            
            if not session:
                raise ValueError("Session non trouvée ou accès non autorisé")

        self.repo.add_message(
            session_id=session_id,
            role="user",
            content=message
        )

        try:
            rag_response = await self.rag.ask(message)

            if not isinstance(rag_response, dict):
                raise Exception("Réponse invalide du backend RAG")

            response = rag_response.get("Answer")

            if not response:
                raise Exception("Le backend RAG n'a retourné aucune réponse")

            response = response.strip()

        except Exception as e:
            raise Exception(f"Erreur lors de la communication avec le backend RAG: {str(e)}")

        self.repo.add_message(
            session_id=session_id,
            role="assistant",
            content=response
        )

        self.repo.update_session_updated_at(session_id)

        return ChatResponse(
            reply=response,
            session_id=session_id
        )

    def get_user_sessions(self, user_id: str) -> list:
        return self.repo.get_user_sessions(user_id)

    def get_session_messages(self, session_id: str, user_id: str) -> list:
        session = self.repo.get_session(
            session_id=session_id,
            user_id=user_id
        )
        
        if not session:
            raise ValueError("Session non trouvée ou accès non autorisé")

        return self.repo.get_session_messages(session_id)

    def delete_session(self, session_id: str, user_id: str) -> bool:
        success = self.repo.delete_session(
            session_id=session_id,
            user_id=user_id
        )
        
        if not success:
            raise ValueError("Session non trouvée ou accès non autorisé")

        return True

    def rename_session(self, session_id: str, user_id: str, new_title: str):
        new_title = new_title.strip()

        if not new_title:
            raise ValueError("Le titre ne peut pas être vide")

        if len(new_title) > 200:
            raise ValueError("Le titre ne peut pas dépasser 200 caractères")

        session = self.repo.rename_session(
            session_id=session_id,
            user_id=user_id,
            new_title=new_title
        )

        if not session:
            raise ValueError("Session non trouvée ou accès non autorisé")

        return session