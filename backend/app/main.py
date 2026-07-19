from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 1. Initialisation de l'application
app = FastAPI(
    title="API Assistant Ministériel",
    description="Backend du chatbot RAG",
    version="1.0.0"
)

# 2. Configuration CORS pour autoriser ton frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

# 3. Route de vérification
@app.get("/")
async def root():
    return {
        "status": "success",
        "message": "Le backend FastAPI est opérationnel."
    }