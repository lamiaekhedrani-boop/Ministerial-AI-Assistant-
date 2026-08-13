from fastapi import Depends
from app.core.security import verify_token

async def get_current_user(token_data: dict = Depends(verify_token)):
    """Récupère les informations de l'utilisateur connecté"""
    return {
        "sub": token_data.get("sub"),
        "username": token_data.get("preferred_username", "Agent"),
        "email": token_data.get("email"),
        "roles": token_data.get("realm_access", {}).get("roles", [])
    }