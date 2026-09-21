# 🚀 Mock Mainframe CI Portal - DevSecOps & GitOps Edition

![Java](https://img.shields.io/badge/Java-17-ED8B00?logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-6DB33F?logo=spring-boot)
![Angular](https://img.shields.io/badge/Angular-Frontend-DD0031?logo=angular)
![Jenkins](https://img.shields.io/badge/Jenkins-Quality_Gate-blue?logo=jenkins)
![GitLab CI](https://img.shields.io/badge/GitLab_CI-DevSecOps-orange?logo=gitlab)
![Trivy](https://img.shields.io/badge/Trivy-Vulnerability_Scanner-blueviolet)
![ArgoCD](https://img.shields.io/badge/ArgoCD-GitOps-brightgreen?logo=argo)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Deployment-blue?logo=kubernetes)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)

## 📖 Description du Projet
Ce projet est une preuve de concept (POC) full-stack simulant un portail interne d'aide au développement et d'intégration continue pour un environnement Mainframe. L'application permet de soumettre des scripts de code, de déclencher des analyses factices et de consulter l'historique des exécutions.

L'objectif de ce dépôt est double : démontrer la capacité à concevoir une application métier moderne et l'intégrer dans une **chaîne d'approvisionnement logicielle sécurisée (Software Supply Chain Security)** de niveau production.

## 🏗️ Architecture Hybride & Pipeline DevSecOps
Le cycle de vie de l'application repose sur une séparation stricte des responsabilités (approche *Best of Breed*) :

1. **Intégration Continue (Jenkins) - *Le Quality Gate*** :
   - Exécution des builds locaux (Maven pour Java, Node.js pour Angular).
   - Validation syntaxique et vérification de l'intégrité du code source avant toute conteneurisation.
2. **Conteneurisation & Sécurité (GitLab CI & Trivy)** :
   - Création d'images Docker légères et optimisées via un *Multi-stage build*.
   - **Shift-Left Security** : Analyse statique des conteneurs avec Trivy. Le pipeline est configuré pour bloquer le déploiement (`--exit-code 1`) si des vulnérabilités `HIGH` ou `CRITICAL` sont détectées.
   - Mise à jour automatique des manifestes Kubernetes via un bot Git (GitOps).
3. **Déploiement Continu (ArgoCD & Kubernetes)** :
   - **Synchronisation Pull** : ArgoCD écoute les modifications sur la branche `main` du dépôt.
   - Déploiement automatisé des nouveaux Pods dans le cluster avec auto-healing et gestion de la dérive de configuration.

## 📂 Structure du Monorepo
Le dépôt est structuré de la manière suivante pour faciliter la séparation des environnements :

- 📁 `k8s/` : Manifestes Kubernetes de l'infrastructure (Déploiements, Services).
- 📁 `mainframe-api/` : Code source du backend (API REST Java/Spring Boot).
- 📁 `mainframe-ui/` : Code source du frontend (Interface Utilisateur Angular).
- 📄 `.gitlab-ci.yml` : Pipeline de build Docker, sécurité Trivy et publication GitOps.
- 📄 `docker-compose.yml` : Fichier de configuration pour le lancement des conteneurs en local.
- 📄 `Jenkinsfile` : Pipeline de validation CI (Quality Gate).

## 🚀 Lancement de l'Application

Vous pouvez lancer ce projet de trois manières différentes, selon votre besoin (Développement, Conteneurisé ou Cluster).

### 🛠️ Prérequis
- **JDK 17** & **Maven**
- **Node.js** (v20+)
- **Docker** & **Docker Compose**
- Un cluster **Kubernetes** local (ex: Docker Desktop, Minikube) avec **ArgoCD** installé.

---

### Option 1 : Mode Développement Local (Serveurs Indépendants)
Idéal pour le développement actif avec rechargement à chaud (Hot Reload).

**1. Démarrer le Backend :**
```bash
cd mainframe-api
mvn clean install -DskipTests
mvn spring-boot:run
```
*L'API REST sera disponible sur : `http://localhost:8080`*

**2. Démarrer le Frontend :**
Dans un nouveau terminal :
```bash
cd mainframe-ui
npm install
npm start
```
*L'interface utilisateur sera disponible sur : `http://localhost:4200`*

---

### Option 2 : Mode Conteneurisé (Docker Compose)
Idéal pour tester l'application complète isolée dans des conteneurs sans configurer Kubernetes.

Depuis la racine du projet, exécutez :
```bash
docker-compose up --build -d
```
*L'application complète (Frontend + Backend liés) sera accessible sur le port configuré dans le fichier `docker-compose.yml` (généralement `http://localhost:80`).*
*Pour stopper l'environnement : `docker-compose down`.*

---

### Option 3 : Mode GitOps (Kubernetes + ArgoCD)
Idéal pour simuler l'environnement de production.

**1. Appliquer les manifestes manuellement (Optionnel si ArgoCD n'est pas configuré) :**
```bash
kubectl apply -f k8s/backend.yaml
kubectl apply -f k8s/frontend.yaml
```

**2. Accéder à l'application via Kubernetes :**
```bash
kubectl port-forward svc/frontend-service 8080:80
```
*L'application sera accessible via : `http://localhost:8080`*

## 👨‍💻 Auteur
**Mohamed Taha Elkharrati**  
*Ingénieur Logiciel & DevSecOps*
