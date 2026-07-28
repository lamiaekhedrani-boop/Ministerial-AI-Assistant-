# Ceci simule ce que la vraie base de données vectorielle nous renverra plus tard
FAKE_MINISTRY_DB = [
    {
        "id": "doc_1", 
        "content": "Le renouvellement du passeport coûte 86 euros en timbre fiscal pour un adulte. Il faut fournir une photo d'identité récente, un justificatif de domicile et l'ancien passeport.", 
        "keywords": ["passeport", "renouvellement", "prix", "identité"]
    },
    {
        "id": "doc_2", 
        "content": "Pour obtenir le formulaire Cerfa de déclaration d'impôts (Cerfa 2042), le citoyen doit se rendre sur le portail officiel des impôts ou le retirer au centre des finances publiques.", 
        "keywords": ["impôts", "cerfa", "formulaire", "déclaration"]
    },
    {
        "id": "doc_3", 
        "content": "Les aides financières pour la rénovation énergétique (MaPrimeRénov') sont soumises à des conditions de ressources. Le dossier doit être déposé avant le début des travaux.", 
        "keywords": ["aide", "finance", "rénovation", "logement", "prime"]
    },
    {
         "id_document": "MIN-NUM-2026-001",
         "titre": "Circulaire relative à la numérisation des services publics",
        "type_document": "Circulaire",
        "date_publication": "2026-01-15",
        "statut": "En vigueur",
        "mots_cles": ["digitalisation", "administration", "e-gov", "portail"],
        "resume": "Directives concernant l'accélération de la transition numérique des procédures administratives.",
        "contenu_texte": "La présente circulaire a pour objectif d'accélérer la dématérialisation des services publics. Tous les départements doivent assurer la disponibilité de leurs formulaires en ligne. Les systèmes doivent garantir l'interopérabilité des données et la sécurité des accès citoyens d'ici le 31 décembre 2026.",
        "url_fichier_source": "https://storage.mock-ministere.ma/docs/circulaire_num_2026.pdf"
    },
    {
        "id_document": "MIN-RH-2025-084",
        "titre": "Décret n° 2-25-123 sur la formation continue des fonctionnaires",
        "type_document": "Décret",
        "date_publication": "2025-11-20",
        "statut": "En vigueur",
        "mots_cles": ["ressources humaines", "formation", "fonction publique"],
        "resume": "Organisation et financement des programmes de formation continue pour le personnel du ministère.",
        "contenu_texte": "Le présent décret fixe les modalités d'accès à la formation continue. Chaque fonctionnaire a droit à un minimum de 30 heures de formation certifiante par an. Les demandes doivent être soumises via la plateforme RH interne et validées par le chef de division.",
        "url_fichier_source": "https://storage.mock-ministere.ma/docs/decret_formation_2025.pdf"
    },
    {
        "id_document": "MIN-BUD-2026-003",
        "titre": "Rapport trimestriel d'exécution du budget d'investissement",
        "type_document": "Rapport",
        "date_publication": "2026-04-05",
        "statut": "Archive",
        "mots_cles": ["budget", "finance", "T1", "investissement"],
        "resume": "Bilan des dépenses d'investissement pour le premier trimestre 2026.",
        "contenu_texte": "Le taux d'exécution budgétaire pour le premier trimestre a atteint 22%. Les principaux postes de dépenses concernent le renouvellement du parc informatique et la réhabilitation des locaux régionaux. Un retard est constaté sur les marchés publics d'infrastructure réseau.",
        "url_fichier_source": "https://storage.mock-ministere.ma/docs/rapport_budget_T1.pdf"
    },
    {
        "id_document": "MIN-SEC-2026-012",
        "titre": "Note de service : Mise à jour des politiques de cybersécurité",
        "type_document": "Note de service",
        "date_publication": "2026-06-10",
        "statut": "En vigueur",
        "mots_cles": ["sécurité", "mot de passe", "réseau", "DSI"],
        "resume": "Nouvelles règles concernant la complexité des mots de passe et l'accès VPN.",
        "contenu_texte": "Suite aux récents audits de sécurité, la DSI impose l'utilisation de l'authentification à double facteur (2FA) pour tous les accès distants via VPN. De plus, les mots de passe des sessions de travail devront désormais comporter au moins 14 caractères et être renouvelés tous les 90 jours.",
        "url_fichier_source": "https://storage.mock-ministere.ma/docs/note_cybersecurite.pdf"
  }    
]