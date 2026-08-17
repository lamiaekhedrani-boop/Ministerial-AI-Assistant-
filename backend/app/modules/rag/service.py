import httpx
from app.core.config import settings

class RAGService:
    def __init__(self):
        self.base_url = settings.RAG_BACKEND_URL.rstrip("/")

    async def ask(self, question: str):
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                f"{self.base_url}/ask",
                json={
                    "question": question
                }
            )

        if response.status_code != 200:
            raise Exception(f"RAG backend error: {response.status_code} - {response.text}")

        return response.json()

    async def get_documents(self):
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.get(
                f"{self.base_url}/documents"
            )

        if response.status_code != 200:
            raise Exception(f"RAG backend error: {response.status_code} - {response.text}")

        data = response.json()
        documents_map = {}

        for chunk in data:
            source = chunk.get("source", "")
            if not source:
                source = "unknown"

            if source not in documents_map:
                doc_type = "unknown"
                if "." in source and source != "unknown":
                    doc_type = source.split(".")[-1].lower()

                documents_map[source] = {
                    "id": source,
                    "name": source if source != "unknown" else "Document inconnu",
                    "type": doc_type,
                    "chunks": 0
                }
            
            documents_map[source]["chunks"] += 1

        return list(documents_map.values())

    async def get_document(self, filename: str):
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.get(
                f"{self.base_url}/document/{filename}"
            )

        if response.status_code != 200:
            raise Exception(f"RAG backend error: {response.status_code} - {response.text}")

        return response.json()

    async def delete_document(self, filename: str):
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.delete(
                f"{self.base_url}/documents/{filename}"
            )

        if response.status_code != 200:
            raise Exception(f"RAG backend error: {response.status_code} - {response.text}")

        return response.json()

    async def upload_document(self, filename: str, content: bytes):
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                f"{self.base_url}/upload_file",
                files={
                    "file": (
                        filename,
                        content
                    )
                }
            )

        if response.status_code != 200:
            raise Exception(f"RAG backend error: {response.status_code} - {response.text}")

        return response.json()

    async def update_document(
        self,
        filename: str,
        new_filename: str,
        content: bytes
    ):
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.put(
                f"{self.base_url}/document/{filename}",
                files={
                    "file": (
                        new_filename,
                        content
                    )
                }
            )

        if response.status_code != 200:
            raise Exception(f"RAG backend error: {response.status_code} - {response.text}")

        return response.json()

rag_service = RAGService()