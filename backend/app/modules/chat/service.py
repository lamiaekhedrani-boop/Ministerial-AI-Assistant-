from sqlalchemy.orm import Session
from typing import Optional

from app.modules.chat.repository import ChatRepository
from app.modules.chat.schemas import ChatResponse
from app.services.llm_service import LLMService
from app.services.retrieval_service import RetrievalService


class ChatService:

    def __init__(self, db: Session):
        self.db = db
        self.repo = ChatRepository(db)
        self.retriever = RetrievalService()
        self.llm = LLMService()

    # ========================================
    # ENVOYER UN MESSAGE
    # ========================================

    async def process_message(
        self,
        user_id: str,
        message: str,
        session_id: Optional[str] = None
    ) -> ChatResponse:

        # 1. Gérer la session
        if not session_id:

            # Générer automatiquement le titre
            title = self.llm.generate_title(message)

            session = self.repo.create_session(
                user_id=user_id,
                title=title
            )

            session_id = session.id

        else:

            # Vérifier que la session appartient à l'utilisateur
            session = self.repo.get_session(
                session_id=session_id,
                user_id=user_id
            )

            if not session:
                raise ValueError(
                    "Session non trouvée ou accès non autorisé"
                )

        # 2. Sauvegarder le message utilisateur
        self.repo.add_message(
            session_id=session_id,
            role="user",
            content=message
        )

        # 3. Récupérer le contexte via RAG
        context = self.retriever.get_relevant_documents(
            message
        )

        # 4. Générer la réponse avec le LLM
        response = self.llm.generate_response(
            message,
            context
        )

        # 5. Sauvegarder la réponse de l'assistant
        self.repo.add_message(
            session_id=session_id,
            role="assistant",
            content=response
        )

        # 6. Mettre à jour la date de modification
        self.repo.update_session_updated_at(
            session_id
        )

        # 7. Retourner la réponse
        return ChatResponse(
            reply=response,
            session_id=session_id
        )

    # ========================================
    # RÉCUPÉRER LES SESSIONS
    # ========================================

    def get_user_sessions(
        self,
        user_id: str
    ) -> list:

        return self.repo.get_user_sessions(
            user_id
        )

    # ========================================
    # RÉCUPÉRER LES MESSAGES
    # ========================================

    def get_session_messages(
        self,
        session_id: str,
        user_id: str
    ) -> list:

        # Vérifier que la session appartient à l'utilisateur
        session = self.repo.get_session(
            session_id=session_id,
            user_id=user_id
        )

        if not session:
            raise ValueError(
                "Session non trouvée ou accès non autorisé"
            )

        return self.repo.get_session_messages(
            session_id
        )

    # ========================================
    # SUPPRIMER UNE SESSION
    # ========================================

    def delete_session(
        self,
        session_id: str,
        user_id: str
    ) -> bool:

        success = self.repo.delete_session(
            session_id=session_id,
            user_id=user_id
        )

        if not success:
            raise ValueError(
                "Session non trouvée ou accès non autorisé"
            )

        return True

    # ========================================
    # RENOMMER UNE SESSION
    # ========================================

    def rename_session(
        self,
        session_id: str,
        user_id: str,
        new_title: str
    ):

        # Nettoyer le titre
        new_title = new_title.strip()

        # Vérifier qu'il n'est pas vide
        if not new_title:
            raise ValueError(
                "Le titre ne peut pas être vide"
            )

        # Vérifier la longueur
        if len(new_title) > 200:
            raise ValueError(
                "Le titre ne peut pas dépasser 200 caractères"
            )

        # Renommer dans la base de données
        session = self.repo.rename_session(
            session_id=session_id,
            user_id=user_id,
            new_title=new_title
        )

        if not session:
            raise ValueError(
                "Session non trouvée ou accès non autorisé"
            )

        return session