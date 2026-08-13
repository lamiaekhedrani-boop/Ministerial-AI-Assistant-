import urllib.request
import json
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from app.core.config import settings

security = HTTPBearer()

# URL des clés publiques Keycloak
JWKS_URL = f"{settings.KEYCLOAK_URL}/realms/{settings.KEYCLOAK_REALM}/protocol/openid-connect/certs"

def get_jwks():
    """Télécharge les clés publiques de Keycloak"""
    try:
        with urllib.request.urlopen(JWKS_URL) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur de chargement des clés: {e}")

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Vérifie le token JWT avec les clés publiques Keycloak"""
    token = credentials.credentials
    
    try:
        # Récupérer les clés publiques
        jwks = get_jwks()
        
        # Décoder et vérifier le token
        payload = jwt.decode(
            token, 
            jwks, 
            algorithms=["RS256"], 
            options={"verify_aud": False}
        )
        
        return payload
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expiré")
    except jwt.JWTError as e:
        raise HTTPException(status_code=401, detail=f"Token invalide: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Erreur de vérification: {str(e)}")