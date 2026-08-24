import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # Database
    DB_HOST: str = os.getenv("DB_HOST", "127.0.0.1")
    DB_PORT: int = int(os.getenv("DB_PORT", "5432"))
    DB_NAME: str = os.getenv("DB_NAME", "ministere_chat")
    DB_USER: str = os.getenv("DB_USER", "lamiae")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD") 
    
    # Keycloak - Client Public (React)
    KEYCLOAK_URL: str = os.getenv("KEYCLOAK_URL", "http://localhost:8080")
    KEYCLOAK_REALM: str = os.getenv("KEYCLOAK_REALM", "ministere-chatbot")
    KEYCLOAK_CLIENT_ID: str = os.getenv("KEYCLOAK_CLIENT_ID", "chat-app")
    
    # Keycloak - Client Admin (FastAPI Service Account)
    KEYCLOAK_ADMIN_CLIENT_ID: str = os.getenv("KEYCLOAK_ADMIN_CLIENT_ID", "fastapi-backend")
    KEYCLOAK_ADMIN_CLIENT_SECRET: str = os.getenv("KEYCLOAK_ADMIN_CLIENT_SECRET")
    
    # CORS
    CORS_ORIGINS: list = ["http://localhost:5173", "http://localhost:3000"]
    
    # Backend RAG
    RAG_BACKEND_URL: str = os.getenv("RAG_BACKEND_URL", "http://rag_backend:8000")

settings = Settings()