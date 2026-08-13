import logging
from typing import List, Optional

from keycloak import KeycloakAdmin
from keycloak.exceptions import KeycloakError, KeycloakGetError, KeycloakPostError

from app.core.config import settings

logger = logging.getLogger(__name__)


class AdminService:

    def __init__(self):
        self.keycloak_admin = None
        self._connect()

    def _connect(self):
        try:
            self.keycloak_admin = KeycloakAdmin(
                server_url=settings.KEYCLOAK_URL,
                realm_name=settings.KEYCLOAK_REALM,
                client_id=settings.KEYCLOAK_ADMIN_CLIENT_ID,
                client_secret_key=settings.KEYCLOAK_ADMIN_CLIENT_SECRET,
                verify=True
            )
        except Exception as e:
            logger.error(f"Erreur de connexion à Keycloak Admin: {e}")
            raise Exception("Impossible de se connecter au serveur d'authentification")

    def _ensure_connection(self):
        if self.keycloak_admin is None:
            self._connect()

    def get_users(
        self,
        search: Optional[str] = None,
        limit: int = 100
    ) -> List[dict]:

        self._ensure_connection()

        try:
            if search:
                users = self.keycloak_admin.get_users({
                    "search": search,
                    "max": limit
                })
            else:
                users = self.keycloak_admin.get_users({
                    "max": limit
                })

            formatted_users = []

            for user in users:
                try:
                    roles = self.keycloak_admin.get_realm_roles_of_user(
                        user["id"]
                    )
                    role_names = [role["name"] for role in roles]
                except Exception:
                    role_names = []

                formatted_users.append({
                    "id": user["id"],
                    "username": user.get("username", ""),
                    "email": user.get("email", ""),
                    "first_name": user.get("firstName", ""),
                    "last_name": user.get("lastName", ""),
                    "enabled": user.get("enabled", True),
                    "roles": role_names,
                    "created_timestamp": user.get("createdTimestamp")
                })

            return formatted_users

        except KeycloakGetError:
            raise Exception(
                "Impossible de récupérer la liste des utilisateurs"
            )
        except Exception as e:
            logger.error(f"Erreur lors de la récupération des utilisateurs: {e}")
            raise Exception(
                "Erreur lors de la récupération des utilisateurs"
            )

    def create_user(
        self,
        username: str,
        email: str,
        password: str,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
        role: str = "user"
    ) -> dict:

        self._ensure_connection()

        role = role.lower()

        if role not in ["user", "admin"]:
            raise Exception("Rôle invalide")

        existing = self.keycloak_admin.get_users({
            "username": username
        })

        if existing:
            raise Exception(
                f"L'utilisateur '{username}' existe déjà"
            )

        try:
            new_user = {
                "username": username,
                "email": email,
                "firstName": first_name or "",
                "lastName": last_name or "",
                "enabled": True,
                "credentials": [
                    {
                        "type": "password",
                        "value": password,
                        "temporary": False
                    }
                ]
            }

            user_id = self.keycloak_admin.create_user(new_user)

            self.assign_user_role(user_id, role)

            user_data = self.keycloak_admin.get_user(user_id)

            return {
                "id": user_id,
                "username": username,
                "email": email,
                "first_name": first_name or "",
                "last_name": last_name or "",
                "enabled": True,
                "roles": [role],
                "created_timestamp": user_data.get(
                    "createdTimestamp"
                )
            }

        except KeycloakPostError as e:
            logger.error(f"Erreur Keycloak: {e}")
            raise Exception(
                "Impossible de créer l'utilisateur"
            )
        except Exception as e:
            logger.error(f"Erreur création utilisateur: {e}")
            raise Exception(
                f"Erreur lors de la création de l'utilisateur: {str(e)}"
            )

    def delete_user(self, user_id: str) -> bool:

        self._ensure_connection()

        try:
            self.keycloak_admin.get_user(user_id)
        except KeycloakGetError:
            raise Exception("Utilisateur non trouvé")

        try:
            self.keycloak_admin.delete_user(user_id)
            return True
        except KeycloakError as e:
            logger.error(f"Erreur Keycloak: {e}")
            raise Exception(
                "Impossible de supprimer l'utilisateur"
            )

    def assign_user_role(
        self,
        user_id: str,
        role_name: str
    ) -> bool:

        self._ensure_connection()

        role_name = role_name.lower()

        if role_name not in ["user", "admin"]:
            raise Exception("Rôle invalide")

        try:
            roles = self.keycloak_admin.get_realm_roles()

            role = next(
                (
                    role
                    for role in roles
                    if role["name"] == role_name
                ),
                None
            )

            if not role:
                self.keycloak_admin.create_realm_role({
                    "name": role_name,
                    "description": f"Rôle {role_name}"
                })

                roles = self.keycloak_admin.get_realm_roles()

                role = next(
                    (
                        role
                        for role in roles
                        if role["name"] == role_name
                    ),
                    None
                )

            if not role:
                raise Exception(
                    f"Impossible de trouver le rôle '{role_name}'"
                )

            self.keycloak_admin.assign_realm_roles(
                user_id,
                [role]
            )

            return True

        except Exception as e:
            logger.error(f"Erreur assignation rôle: {e}")
            raise Exception(
                f"Impossible d'assigner le rôle: {str(e)}"
            )

    def logout_user(self, user_id: str) -> bool:

        self._ensure_connection()

        try:
            self.keycloak_admin.delete_user_sessions(user_id)
            return True
        except Exception as e:
            logger.error(f"Erreur déconnexion utilisateur: {e}")
            raise Exception(
                "Impossible de déconnecter l'utilisateur"
            )

    def get_user_roles(
        self,
        user_id: str
    ) -> List[str]:

        self._ensure_connection()

        try:
            roles = self.keycloak_admin.get_realm_roles_of_user(
                user_id
            )

            return [role["name"] for role in roles]

        except Exception as e:
            logger.error(f"Erreur récupération rôles: {e}")
            return []

    def update_user(
        self,
        user_id: str,
        **kwargs
    ) -> dict:

        self._ensure_connection()

        try:
            current_user = self.keycloak_admin.get_user(
                user_id
            )

            for key, value in kwargs.items():

                if key in [
                    "username",
                    "email",
                    "firstName",
                    "lastName",
                    "enabled"
                ]:
                    current_user[key] = value

            self.keycloak_admin.update_user(
                user_id,
                current_user
            )

            return current_user

        except Exception as e:
            logger.error(f"Erreur mise à jour utilisateur: {e}")
            raise Exception(
                f"Impossible de mettre à jour l'utilisateur: {str(e)}"
            )