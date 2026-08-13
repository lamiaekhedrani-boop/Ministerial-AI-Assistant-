from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List
from datetime import datetime


class UserCreateRequest(BaseModel):
    username: str = Field(
        ...,
        min_length=3,
        max_length=50,
        description="Nom d'utilisateur"
    )
    email: EmailStr = Field(
        ...,
        description="Adresse email valide"
    )
    password: str = Field(
        ...,
        min_length=6,
        description="Mot de passe"
    )
    first_name: Optional[str] = Field(
        None,
        max_length=50,
        description="Prénom"
    )
    last_name: Optional[str] = Field(
        None,
        max_length=50,
        description="Nom"
    )
    role: str = Field(
        default="user",
        pattern="^(user|admin)$",
        description="Rôle de l'utilisateur"
    )


class UserUpdateRequest(BaseModel):
    username: Optional[str] = Field(
        None,
        min_length=3,
        max_length=50
    )
    email: Optional[EmailStr] = None
    first_name: Optional[str] = Field(
        None,
        max_length=50
    )
    last_name: Optional[str] = Field(
        None,
        max_length=50
    )
    enabled: Optional[bool] = None
    role: Optional[str] = Field(
        None,
        pattern="^(user|admin)$"
    )


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    username: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    enabled: bool
    roles: List[str] = Field(default_factory=list)
    created_timestamp: Optional[int] = None
    created_at: Optional[datetime] = None


class UserListResponse(BaseModel):
    users: List[UserResponse]
    total: int


class UserDeleteResponse(BaseModel):
    success: bool
    message: str


class UserCreateResponse(BaseModel):
    success: bool
    message: str
    user_id: Optional[str] = None
    user: Optional[UserResponse] = None


class RoleAssignmentRequest(BaseModel):
    role: str = Field(
        ...,
        pattern="^(user|admin)$"
    )