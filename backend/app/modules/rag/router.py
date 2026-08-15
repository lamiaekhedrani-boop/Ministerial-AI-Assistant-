from fastapi import APIRouter, Depends, UploadFile, File

from app.core.dependencies import get_current_user
from app.modules.rag.service import rag_service

router = APIRouter(
    prefix="/api/rag",
    tags=["RAG"]
)


@router.post("/ask")
async def ask_rag(
    question: str,
    current_user: dict = Depends(get_current_user)
):
    return await rag_service.ask(question)


@router.get("/documents")
async def get_documents(
    current_user: dict = Depends(get_current_user)
):
    return await rag_service.get_documents()


@router.post("/documents")
async def upload_document(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    return await rag_service.upload_document(file)


@router.delete("/documents/{filename}")
async def delete_document(
    filename: str,
    current_user: dict = Depends(get_current_user)
):
    return await rag_service.delete_document(filename)


@router.put("/documents/{filename}")
async def update_document(
    filename: str,
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    return await rag_service.update_document(filename, file)