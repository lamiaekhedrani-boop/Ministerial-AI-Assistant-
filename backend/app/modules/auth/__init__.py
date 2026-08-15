import os
import httpx
from fastapi import HTTPException, UploadFile

RAG_API_URL = os.getenv("RAG_API_URL", "http://127.0.0.1:8001")


class RAGService:

    async def ask(self, question: str):
        try:
            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(
                    f"{RAG_API_URL}/ask",
                    json={"question": question}
                )

            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=response.text
                )

            return response.json()

        except httpx.RequestError:
            raise HTTPException(
                status_code=503,
                detail="Le serveur RAG est indisponible."
            )

    async def get_documents(self):
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.get(
                    f"{RAG_API_URL}/documents"
                )

            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=response.text
                )

            return response.json()

        except httpx.RequestError:
            raise HTTPException(
                status_code=503,
                detail="Le serveur RAG est indisponible."
            )

    async def upload_document(self, file: UploadFile):
        try:
            content = await file.read()

            files = {
                "file": (
                    file.filename,
                    content,
                    file.content_type
                )
            }

            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(
                    f"{RAG_API_URL}/upload_file",
                    files=files
                )

            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=response.text
                )

            return response.json()

        except httpx.RequestError:
            raise HTTPException(
                status_code=503,
                detail="Le serveur RAG est indisponible."
            )

    async def delete_document(self, filename: str):
        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.delete(
                    f"{RAG_API_URL}/documents/{filename}"
                )

            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=response.text
                )

            return response.json()

        except httpx.RequestError:
            raise HTTPException(
                status_code=503,
                detail="Le serveur RAG est indisponible."
            )

    async def update_document(self, filename: str, file: UploadFile):
        try:
            content = await file.read()

            files = {
                "file": (
                    file.filename,
                    content,
                    file.content_type
                )
            }

            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.put(
                    f"{RAG_API_URL}/document/{filename}",
                    files=files
                )

            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code,
                    detail=response.text
                )

            return response.json()

        except httpx.RequestError:
            raise HTTPException(
                status_code=503,
                detail="Le serveur RAG est indisponible."
            )


rag_service = RAGService()