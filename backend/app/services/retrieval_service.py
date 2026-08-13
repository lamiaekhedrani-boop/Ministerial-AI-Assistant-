from typing import List

class RetrievalService:
    def __init__(self):
        # Initialisation du vector store
        # Pour l'instant, on utilise une liste en mémoire
        self.documents = [
            "Les ministères marocains sont organisés en départements.",
            "Le ministère de l'Intérieur gère les affaires locales.",
            "Le ministère des Finances supervise le budget de l'État.",
            "Le ministère de la Santé coordonne les politiques de santé publique.",
            "Le ministère de l'Éducation nationale gère le système éducatif."
        ]
    
    def get_relevant_documents(self, query: str, top_k: int = 3) -> List[str]:
        """
        Récupère les documents pertinents pour la requête
        """
        # TODO: Implémenter un vrai vector store avec embeddings
        # Pour l'instant, on fait une recherche simple par mots-clés
        
        results = []
        query_words = query.lower().split()
        
        for doc in self.documents:
            # Score simple basé sur le nombre de mots communs
            doc_words = doc.lower().split()
            score = sum(1 for word in query_words if word in doc_words)
            if score > 0:
                results.append((doc, score))
        
        # Trier par score
        results.sort(key=lambda x: x[1], reverse=True)
        
        # Retourner les top_k documents
        return [doc for doc, score in results[:top_k]]
    
    def add_document(self, document: str):
        """
        Ajoute un document à la base de connaissances
        """
        self.documents.append(document)
    
    def get_all_documents(self) -> List[str]:
        """
        Récupère tous les documents
        """
        return self.documents