from fastapi import APIRouter, Depends
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.get("/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Récupérer les informations de l'utilisateur connecté"""
    return {
        "user": current_user,
        "authenticated": True
    }