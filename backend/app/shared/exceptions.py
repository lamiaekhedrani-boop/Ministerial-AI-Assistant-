class AppException(Exception):
    """Exception de base pour l'application"""
    pass

class AuthenticationException(AppException):
    """Exception d'authentification"""
    pass

class ChatException(AppException):
    """Exception liée au chat"""
    pass

class NotFoundException(AppException):
    """Exception pour ressources non trouvées"""
    pass