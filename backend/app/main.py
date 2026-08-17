from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.modules.chat.router import router as chat_router
from app.modules.auth.router import router as auth_router
from app.core.database import engine
from app.modules.chat.models import Base
from app.modules.admin.router import router as admin_router
from app.modules.rag.router import router as rag_router

# Créer les tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Assistant IA Ministériel", version="1.0.0")

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routeurs
app.include_router(chat_router)
app.include_router(auth_router)
app.include_router(rag_router)

@app.get("/")
def read_root():
    return {"message": "Assistant IA Ministériel API", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

app.include_router(admin_router)