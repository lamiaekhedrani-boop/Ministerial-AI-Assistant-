class LLMService:
    def __init__(self):
        # Initialisation du modèle de langage
        # Pour l'instant, on simule, mais plus tard on pourra intégrer OpenAI, Mistral, etc.
        pass
    
    def generate_response(self, user_query: str, context: list) -> str:
        """
        Génère une réponse basée sur la requête utilisateur et le contexte
        """
        # TODO: Intégrer un vrai LLM (OpenAI, Mistral, ou autre)
        # Pour l'instant, simulation
        
        if context:
            context_text = "\n".join(context)
            response = f"Basé sur les documents suivants :\n{context_text}\n\nRéponse à votre question : '{user_query}'\n\n(Le système RAG est en cours de développement)"
        else:
            response = f"Je n'ai pas trouvé de documents pertinents pour votre question : '{user_query}'. Veuillez préciser votre demande."
        
        return response
    
    def generate_title(self, message: str) -> str:
        """
        Génère un titre à partir du premier message
        """
        # Version simplifiée
        if len(message) > 50:
            return message[:50] + "..."
        return message