
# Projet Ministère - Assistant IA RAG

Ce projet est une application full-stack conteneurisée permettant de déployer un assistant conversationnel basé sur une architecture RAG (Retrieval-Augmented Generation).

## Architecture

L'application est divisée en plusieurs microservices orchestrés via Docker Compose :
* Frontend : Interface utilisateur développée en React (Vite).
* Backend API : API principale développée avec FastAPI.
* Backend RAG : Module d'intelligence artificielle interfaçant avec les modèles LLM (Groq).
* Base de données : PostgreSQL.
* Authentification : Serveur d'identité Keycloak avec thème personnalisé.

## Prérequis

* Docker et Docker Compose
* Git

## Installation et configuration

1. Clonage du dépôt :
```bash
git clone <URL_DU_DEPOT>
cd projet-ministere

```

2. Fichiers d'environnement :
Les fichiers de configuration sensibles sont ignorés par Git. Vous devez placer les fichiers suivants à la racine du projet avant le lancement :

* `.env` : Configuration globale (identifiants PostgreSQL, URLs, et clés Keycloak).
* `.env.rag` : Configuration du module IA (Clé API Groq et noms des modèles).

3. Démarrage de l'infrastructure :

```bash
docker-compose up -d --build

```

## Configuration Post-Déploiement (Premier lancement)

Lors de la première installation ou de la recréation des volumes, les étapes suivantes sont obligatoires pour garantir le fonctionnement du pipeline :

1. Configuration du Client Secret (Backend) :

* Accéder à la console d'administration Keycloak (http://localhost:8080).
* Naviguer vers les paramètres du client dédié au backend (ex: `fastapi-backend`).
* Dans l'onglet "Credentials", copier le "Client Secret".
* Mettre à jour la variable `KEYCLOAK_ADMIN_CLIENT_SECRET` dans le fichier `.env` puis redémarrer l'infrastructure.

2. Structure du Thème Keycloak :
Pour être détecté par Keycloak, le thème d'authentification personnalisé doit respecter l'arborescence stricte suivante : le fichier `theme.properties` et le dossier des ressources doivent impérativement se trouver dans un sous-dossier nommé `login` (ex: `/keycloak-theme/login/`).
3. Initialisation de la base RAG :
Avant toute utilisation du chatbot, il est nécessaire d'initialiser les données via la page "Gestion" du frontend :

* Ajouter le compte utilisateur dans la base de données interne.
* Uploader au moins un document de référence.
*Note : Si la base documentaire est vide, le module de recherche vectorielle du RAG générera une erreur interne 500.*

## Accès aux services

Une fois l'infrastructure démarrée et configurée, les services sont accessibles aux adresses suivantes :

* Frontend (Interface Chat & Gestion) : http://localhost:5173
* Backend API (Documentation Swagger) : http://localhost:8000/docs
* Backend RAG (Documentation Swagger) : http://localhost:8001/docs
* Console d'administration Keycloak : http://localhost:8080

```
