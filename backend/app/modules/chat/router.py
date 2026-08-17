from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.modules.chat.schemas import (
    MessageRequest,
    ChatResponse,
    SessionResponse,
    MessageResponse,
    SessionRenameRequest
)

from app.modules.chat.service import ChatService
from app.core.database import get_db
from app.core.dependencies import get_current_user


router = APIRouter(
    prefix="/api/chat",
    tags=["Chat"]
)


@router.post(
    "/send",
    response_model=ChatResponse
)
async def send_message(
    request: MessageRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    service = ChatService(db)

    try:
        result = await service.process_message(
            user_id=current_user["sub"],
            message=request.message,
            session_id=request.session_id
        )

        return result

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get(
    "/sessions",
    response_model=List[SessionResponse]
)
async def get_sessions(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    service = ChatService(db)

    return service.get_user_sessions(
        current_user["sub"]
    )


@router.get(
    "/sessions/{session_id}/messages",
    response_model=List[MessageResponse]
)
async def get_session_messages(
    session_id: str,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    service = ChatService(db)

    try:
        return service.get_session_messages(
            session_id=session_id,
            user_id=current_user["sub"]
        )

    except ValueError as e:
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.delete(
    "/sessions/{session_id}"
)
async def delete_session(
    session_id: str,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    service = ChatService(db)

    try:

        service.delete_session(
            session_id=session_id,
            user_id=current_user["sub"]
        )

        return {
            "success": True,
            "message": "Session supprimée avec succès"
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.put(
    "/sessions/{session_id}"
)
async def rename_session(
    session_id: str,
    request: SessionRenameRequest,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    service = ChatService(db)

    try:

        session = service.rename_session(
            session_id=session_id,
            user_id=current_user["sub"],
            new_title=request.title
        )

        return {
            "success": True,
            "message": "Session renommée avec succès",
            "session": session
        }

    except ValueError as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )