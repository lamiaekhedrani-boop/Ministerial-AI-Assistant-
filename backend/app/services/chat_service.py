from app.services.retrieval_service import RetrievalService
from app.services.llm_service import LLMService

class ChatService:
    def __init__(self):
        self.retriever = RetrievalService()
        self.llm = LLMService()

    def process_chat(self, user_query: str) -> str:
        # 1. Retrieval
        context = self.retriever.get_relevant_documents(user_query)
        
        # 2. LLM Generation
        response = self.llm.generate_response(user_query, context)
        
        return response