pipeline {
    agent any

    environment {
        // Déclaration des identifiants et variables d'environnement
        DOCKER_USERNAME = 'tahael55'
        IMAGE_TAG = 'latest'
    }

    stages {
        // ----------------------------------------------------------------------
        // ÉTAPE 1 : CONSTRUCTION DES CONTENEURS (MULTI-STAGE BUILD)
        // ----------------------------------------------------------------------
        stage('Dockerize Backend (Java)') {
            steps {
                echo "=== Construction de l'image Docker du Backend ==="
                dir('mainframe-api') {
                    // Délégation de la compilation Maven au multi-stage Dockerfile
                    sh 'docker build -t ${DOCKER_USERNAME}/mainframe-api:${IMAGE_TAG} .'
                }
            }
        }

        stage('Dockerize Frontend (Angular)') {
            steps {
                echo "=== Construction de l'image Docker du Frontend ==="
                dir('mainframe-ui') {
                    // Délégation de la compilation Angular au multi-stage Dockerfile
                    sh 'docker build -t ${DOCKER_USERNAME}/mainframe-ui:${IMAGE_TAG} .'
                }
            }
        }

        // ----------------------------------------------------------------------
        // ÉTAPE 2 : CONTRÔLE DE SÉCURITÉ DEVSECOPS (TRIVY SCANNER)
        // ----------------------------------------------------------------------
        stage('Security Scan Backend (Trivy)') {
            steps {
                echo "=== Analyse de sécurité du Backend avec Trivy ==="
                // Détection des vulnérabilités critiques et blocage du pipeline si détectées
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity HIGH,CRITICAL --exit-code 1 ${DOCKER_USERNAME}/mainframe-api:${IMAGE_TAG}'
            }
        }

        stage('Security Scan Frontend (Trivy)') {
            steps {
                echo "=== Analyse de sécurité du Frontend avec Trivy ==="
                // Analyse statique du conteneur et du serveur Nginx embarqué
                sh 'docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy:latest image --severity HIGH,CRITICAL --exit-code 1 ${DOCKER_USERNAME}/mainframe-ui:${IMAGE_TAG}'
            }
        }
    }
    
    post {
        success {
            echo "Pipeline Jenkins validé : images construites et conformes aux règles de sécurité !"
        }
        failure {
            echo "Échec du pipeline : vérifier les erreurs de build ou les vulnérabilités Trivy."
        }
    }
}