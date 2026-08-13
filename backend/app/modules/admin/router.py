from fastapi import APIRouter, Depends, HTTPException, status
from typing import Optional

from app.modules.admin.schemas import (
    UserCreateRequest,
    UserResponse,
    UserListResponse,
    UserDeleteResponse,
    UserCreateResponse,
    RoleAssignmentRequest
)
from app.modules.admin.service import AdminService
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/api/admin", tags=["Admin"])


def require_admin(
    current_user: dict = Depends(get_current_user)
) -> dict:
    user_roles = current_user.get("roles", [])

    normalized_roles = [
        role.lower() for role in user_roles
    ]

    if "admin" not in normalized_roles:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Accès refusé : droits administrateur requis"
        )

    return current_user


@router.get(
    "/users",
    response_model=UserListResponse
)
async def get_users(
    search: Optional[str] = None,
    limit: int = 100,
    current_user: dict = Depends(require_admin)
):
    service = AdminService()

    try:
        users = service.get_users(
            search=search,
            limit=limit
        )

        return UserListResponse(
            users=users,
            total=len(users)
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post(
    "/users",
    response_model=UserCreateResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_user(
    user_data: UserCreateRequest,
    current_user: dict = Depends(require_admin)
):
    service = AdminService()

    try:
        new_user = service.create_user(
            username=user_data.username,
            email=user_data.email,
            password=user_data.password,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            role=user_data.role
        )

        return UserCreateResponse(
            success=True,
            message=f"Utilisateur {user_data.username} créé avec succès",
            user_id=new_user["id"],
            user=UserResponse(**new_user)
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.delete(
    "/users/{user_id}",
    response_model=UserDeleteResponse
)
async def delete_user(
    user_id: str,
    current_user: dict = Depends(require_admin)
):
    service = AdminService()

    try:
        service.delete_user(user_id)

        return UserDeleteResponse(
            success=True,
            message=f"Utilisateur {user_id} supprimé avec succès"
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post(
    "/users/{user_id}/roles",
    response_model=dict
)
async def assign_role(
    user_id: str,
    role_data: RoleAssignmentRequest,
    current_user: dict = Depends(require_admin)
):
    service = AdminService()

    try:
        service.assign_user_role(
            user_id,
            role_data.role
        )

        return {
            "success": True,
            "message": f"Rôle {role_data.role} assigné à l'utilisateur {user_id}"
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.post(
    "/users/{user_id}/logout",
    response_model=dict
)
async def logout_user(
    user_id: str,
    current_user: dict = Depends(require_admin)
):
    service = AdminService()

    try:
        service.logout_user(user_id)

        return {
            "success": True,
            "message": f"Utilisateur {user_id} déconnecté"
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get(
    "/users/{user_id}/roles",
    response_model=list[str]
)
async def get_user_roles(
    user_id: str,
    current_user: dict = Depends(require_admin)
):
    service = AdminService()

    try:
        return service.get_user_roles(user_id)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )