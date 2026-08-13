from typing import Any, Optional

class APIResponse:
    @staticmethod
    def success(data: Any, message: str = "Success") -> dict:
        return {
            "status": "success",
            "message": message,
            "data": data
        }
    
    @staticmethod
    def error(message: str, status_code: int = 400) -> dict:
        return {
            "status": "error",
            "message": message
        }