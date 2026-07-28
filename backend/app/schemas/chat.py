from pydantic import BaseModel

# Modèle pour la requête venant de React
class ChatRequest(BaseModel):
    message: str

# Modèle pour la réponse renvoyée par FastAPI
class ChatResponse(BaseModel):
    reply: str