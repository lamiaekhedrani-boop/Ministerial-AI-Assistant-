from fastapi import APIRouter
from app.schemas.chat import ChatRequest, ChatResponse

# On crée un routeur spécifique pour tout ce qui concerne le chat
router = APIRouter()

# On définit que cette route écoute les requêtes POST sur /chat
# Et on lui précise qu'elle doit renvoyer un modèle ChatResponse
@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    
    # ---------------------------------------------------------
    # PLUS TARD : C'est ici qu'on appellera le LLM et le RAG !
    # ---------------------------------------------------------
    
    # POUR L'INSTANT : On simule une réponse de l'IA pour vérifier que tout communique bien
    fake_reply = f"J'ai bien reçu votre message : '{request.message}'. Le système RAG est en cours de construction."
    
    # On renvoie la réponse en respectant strictement le schéma Pydantic
    return ChatResponse(reply=fake_reply)