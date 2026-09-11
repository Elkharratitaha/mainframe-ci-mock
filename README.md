# Mock Mainframe CI Portal

## Description
Ce projet est une preuve de concept (POC) full-stack simulant un portail interne d'aide au développement et de CI pour un environnement Mainframe. 
L'application permet de soumettre des scripts de code, de déclencher des analyses factices (simulant une CI Mainframe hybride) et de consulter l'historique des exécutions.

L'objectif de ce dépôt est de démontrer la capacité à concevoir, développer et automatiser le déploiement d'une application interne moderne.

## Stack Technique
- **Backend :** Java 17, Spring Boot, Maven
- **Frontend :** Angular, TypeScript
- **CI/CD :** GitLab CI, Jenkins (Pipeline hybride)
- **Conteneurisation :** Docker, Docker Compose / Kubernetes (Minikube)

## Structure du projet
Le projet est organisé en monorepo :
- `/mainframe-api` : Code source du backend (API REST)
- `/mainframe-ui` : Code source du frontend (Interface Utilisateur)

## Prérequis locaux
- JDK 17
- Node.js (v22+)
- Maven
- Docker

## Lancement rapide (Développement local)

### Backend
\`\`\`bash
cd mainframe-api
mvn spring-boot:run
\`\`\`
L'API sera disponible sur : http://localhost:8080

### Frontend
\`\`\`bash
cd mainframe-ui
npm install
npm start
\`\`\`
L'interface sera disponible sur : http://localhost:4200
