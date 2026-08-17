from pydantic import BaseModel
from typing import Any, Optional, List, Dict

class QuestionRequest(BaseModel):
    question: str

class RAGResponse(BaseModel):
    Question: Optional[str] = None
    Answer: str
    total_time: Optional[float] = None
    expansion_time: Optional[float] = None
    retrieval_time: Optional[float] = None
    reranker_time: Optional[float] = None
    llm_time: Optional[float] = None
    token_usage: Optional[dict] = None
    cached: Optional[str] = None

class DocumentSummary(BaseModel):
    id: str
    name: str
    type: str
    chunks: int

class DocumentResponse(BaseModel):
    filename: str
    total_chunks: Optional[int] = None
    chunks: Optional[List[dict]] = None

class DocumentDeleteResponse(BaseModel):
    message: str
    filename: str
    deleted_chunks: int

class DocumentUploadResponse(BaseModel):
    message: str
    filename: str
    Number_of_chunks: Optional[int] = None