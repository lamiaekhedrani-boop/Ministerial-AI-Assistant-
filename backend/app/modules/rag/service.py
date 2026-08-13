from typing import List

class RAGService:
    def __init__(self):
        # Initialisation du vector store et des embeddings
        pass
    
    def get_relevant_documents(self, query: str, top_k: int = 5) -> List[str]:
        """Récupère les documents pertinents pour la requête"""
        # À implémenter avec un vector store
        return ["Document context 1", "Document context 2"]
    
    def add_document(self, document: str, metadata: dict):
        """Ajoute un document à la base vectorielle"""
        # À implémenter
        pass