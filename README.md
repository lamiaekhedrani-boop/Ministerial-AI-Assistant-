# Projet Ministère - Assistant IA RAG

Ce projet est une application full-stack conteneurisée permettant de déployer un assistant conversationnel basé sur une architecture RAG (Retrieval-Augmented Generation).

## Architecture

L'application est orchestrée via Docker Compose :
* Frontend : React (Vite).
* Backend API : FastAPI.
* Backend RAG : Module IA (Groq).
* Base de données : PostgreSQL.
* Authentification : Serveur d'identité Keycloak avec thème personnalisé.

## Prérequis

* Docker et Docker Compose
* Git

## 1. Installation

1. Clonage du dépôt :
```bash
git clone <URL_DU_DEPOT>
cd projet-ministere

```

2. Fichiers d'environnement :
Placer les deux fichiers fournis séparément (`.env` et `.env.rag`) à la racine du projet.
3. Démarrage :

```bash
docker-compose up -d --build

```

## 2. Configuration Initiale (Premier lancement)

Lors du tout premier lancement, la base de données est vierge. Deux étapes rapides sont nécessaires pour utiliser le Chatbot :

**Étape A : Créer un compte de test**

* Accéder à Keycloak (http://localhost:8080).
* Se connecter avec les identifiants administrateurs fournis dans le fichier `.env` (`KEYCLOAK_ADMIN`).
* Créer un nouvel utilisateur dans le realm `ministere-chatbot` (lui définir un mot de passe dans l'onglet Credentials).

**Étape B : Initialiser la base RAG**

* Se connecter au Frontend (http://localhost:5173) avec le compte tout juste créé.
* Aller dans l'onglet "Gestion" > "Documents".
* Uploader au moins un document de référence pour initialiser la recherche vectorielle (sans document, l'IA retournera une erreur 500).

## Accès aux services

* Frontend (Interface Chat & Gestion) : http://localhost:5173
* Backend API (Swagger) : http://localhost:8000/docs
* Backend RAG (Swagger) : http://localhost:8001/docs
* Console Keycloak : http://localhost:8080

```
