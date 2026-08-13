import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  fr: {
    // Général
    'app.title': 'Assistant IA Ministériel',
    'app.subtitle': 'Réponses basées sur les documents officiels',
    
    // Chat
    'chat.placeholder': 'Posez votre question...',
    'chat.send': 'Envoyer',
    'chat.new': 'Nouvelle conversation',
    'chat.history': 'Historique',
    'chat.empty': 'Aucun message',
    
    // Auth & Profil
    'auth.login': 'Se connecter',
    'auth.logout': 'Déconnexion',
    'profile.title': 'Profil',
    'profile.name': 'Nom',
    'profile.email': 'Email',
    'profile.role': 'Rôle',
    'profile.language': 'Langue',
    
    // Admin - Général
    'admin.title': 'Gestion',
    'admin.users': 'Utilisateurs',
    'admin.documents': 'Documents',
    'admin.delete': 'Supprimer',
    'admin.loading': 'Chargement...',
    'admin.actions': 'Actions',
    
    // Admin - Utilisateurs
    'admin.add_user': 'Ajouter un utilisateur',
    'admin.email': 'Email',
    'admin.password': 'Mot de passe',
    'admin.no_users': 'Aucun utilisateur',
    'admin.confirm_delete': 'Supprimer cet utilisateur ?',
    
    // Admin - Documents
    'admin.add_document': 'Ajouter un document',
    'admin.name': 'Nom',
    'admin.type': 'Type',
    'admin.size': 'Taille',
    'admin.no_documents': 'Aucun document',
    'admin.confirm_delete_document': 'Supprimer ce document ?',

    // Sidebar
    'chat.new': 'Nouvelle conversation',
    'chat.history': 'Historique',
    'chat.empty': 'Aucun historique',
    'chat.rename': 'Renommer la conversation',
    'chat.rename_placeholder': 'Nouveau titre...',
    'chat.delete_confirm': 'Supprimer cette conversation ?',
    'common.cancel': 'Annuler',
    'common.rename': 'Renommer',
    'chat.delete': 'Supprimer',

    // Welcome
    'chat.welcome': "Comment puis-je vous aider aujourd'hui ?",
    'chat.placeholder': 'Posez votre question sur les démarches...',
    
  },

  ar: {
    // Général
    'app.title': 'المساعد الذكي الوزاري',
    'app.subtitle': 'إجابات مبنية على الوثائق الرسمية',
    
    // Chat
    'chat.placeholder': 'اطرح سؤالك...',
    'chat.send': 'إرسال',
    'chat.new': 'محادثة جديدة',
    'chat.history': 'السجل',
    'chat.empty': 'لا توجد رسائل',
    
    // Auth & Profil
    'auth.login': 'تسجيل الدخول',
    'auth.logout': 'تسجيل الخروج',
    'profile.title': 'الملف الشخصي',
    'profile.name': 'الاسم',
    'profile.email': 'البريد الإلكتروني',
    'profile.role': 'الدور',
    'profile.language': 'اللغة',
    
    // Admin - Général
    'admin.title': 'الإدارة',
    'admin.users': 'المستخدمون',
    'admin.documents': 'الوثائق',
    'admin.delete': 'حذف',
    'admin.loading': 'جارٍ التحميل...',
    'admin.actions': 'الإجراءات',
    
    // Admin - Utilisateurs
    'admin.add_user': 'إضافة مستخدم',
    'admin.email': 'البريد الإلكتروني',
    'admin.password': 'كلمة المرور',
    'admin.no_users': 'لا يوجد مستخدمون',
    'admin.confirm_delete': 'هل تريد حذف هذا المستخدم؟',
    
    // Admin - Documents
    'admin.add_document': 'إضافة وثيقة',
    'admin.name': 'الاسم',
    'admin.type': 'النوع',
    'admin.size': 'الحجم',
    'admin.no_documents': 'لا توجد وثائق',
    'admin.confirm_delete_document': 'هل تريد حذف هذه الوثيقة؟',

    // Sidebar
    'chat.new': 'محادثة جديدة',
    'chat.history': 'سجل المحادثات',
    'chat.empty': 'لا يوجد سجل للمحادثات',
    'chat.rename': 'إعادة تسمية المحادثة',
    'chat.rename_placeholder': 'عنوان جديد...',
    'chat.delete_confirm': 'هل تريد حذف هذه المحادثة؟',
    'common.cancel': 'إلغاء',
    'common.rename': 'إعادة تسمية',
    'chat.delete': 'حذف',

    // Welcome
    'chat.welcome': 'كيف يمكنني مساعدتك اليوم؟',
    'chat.placeholder': 'اطرح سؤالك حول الإجراءات...',

  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('app_language') || 'fr';
  });

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('app_language', language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'ar' : 'fr');
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        dir,
        t,
        toggleLanguage,
        setLanguage
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);