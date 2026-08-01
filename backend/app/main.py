from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from jose import jwt
import urllib.request
import json

app = FastAPI()

# 1. Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    prompt: str

# 2. Configuration de la sécurité
security = HTTPBearer()
# C'est ici que FastAPI va chercher les clés publiques de ton Keycloak
JWKS_URL = "http://localhost:8080/realms/ministere-chatbot/protocol/openid-connect/certs"

def verifier_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        # FastAPI télécharge les clés publiques de Keycloak
        with urllib.request.urlopen(JWKS_URL) as response:
            jwks = json.loads(response.read().decode())
        
        # On vérifie la signature du jeton avec ces clés
        payload = jwt.decode(token, jwks, algorithms=["RS256"], options={"verify_aud": False})
        return payload
        
    except Exception as e:
        print(f"Erreur de sécurité : {e}")
        raise HTTPException(status_code=401, detail="Laissez-passer invalide ou expiré")

# 3. La route sécurisée avec un verrou (Depends)
@app.post("/api/chat")
async def chat_endpoint(message: Message, utilisateur: dict = Depends(verifier_token)):
    # Si le code arrive ici, c'est que le token est  valide !
    nom_utilisateur = utilisateur.get("preferred_username", "Agent Inconnu")
    
    return {
        "message": f"Accès sécurisé accordé à {nom_utilisateur}. Le backend a bien reçu : '{message.prompt}'"
    }
@app.get("/")
def read_root():
    return {"message": "Le backend API fonctionne !"}