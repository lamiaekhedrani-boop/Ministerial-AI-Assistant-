from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from typing import List
from app.core.dependencies import get_current_user
from app.modules.rag.service import rag_service
from app.modules.rag.schemas import (
    QuestionRequest,
    DocumentSummary
)

router = APIRouter(
    prefix="/api/rag",
    tags=["RAG"]
)

@router.post("/ask")
async def ask_question(
    request: QuestionRequest,
    current_user: dict = Depends(get_current_user)
):
    try:
        return await rag_service.ask(
            request.question
        )
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e)
        )

@router.get("/documents", response_model=List[DocumentSummary])
async def get_documents(
    current_user: dict = Depends(get_current_user)
):
    try:
        return await rag_service.get_documents()
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e)
        )

@router.get("/documents/{filename}")
async def get_document(
    filename: str,
    current_user: dict = Depends(get_current_user)
):
    try:
        return await rag_service.get_document(
            filename
        )
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e)
        )

@router.post("/documents")
async def upload_document(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    try:
        content = await file.read()
        return await rag_service.upload_document(
            file.filename,
            content
        )
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e)
        )

@router.delete("/documents/{filename}")
async def delete_document(
    filename: str,
    current_user: dict = Depends(get_current_user)
):
    try:
        return await rag_service.delete_document(
            filename
        )
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e)
        )

@router.put("/documents/{filename}")
async def update_document(
    filename: str,
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    try:
        content = await file.read()
        return await rag_service.update_document(
            filename,
            file.filename,
            content
        )
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=str(e)
        )