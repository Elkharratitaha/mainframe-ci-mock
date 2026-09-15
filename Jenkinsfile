pipeline {
    agent any

    environment {
        DOCKER_USERNAME = 'tahael55'
        IMAGE_TAG = 'latest' 
    }

    stages {
        stage('Dockerize Backend (Java)') {
            steps {
                echo "=== Lancement du build Docker pour le Backend ==="
                dir('mainframe-api') {
                    sh 'docker build -t ${DOCKER_USERNAME}/mainframe-api:${IMAGE_TAG} .'
                }
            }
        }

        stage('Dockerize Frontend (Angular)') {
            steps {
                echo "=== Lancement du build Docker pour le Frontend ==="
                dir('mainframe-ui') {
                    sh 'docker build -t ${DOCKER_USERNAME}/mainframe-ui:${IMAGE_TAG} .'
                }
            }
        }
    }
    
    post {
        success {
            echo "Pipeline Jenkins termine avec succes ! Images creees."
        }
        failure {
            echo "Le pipeline a echoue. Va voir les logs !"
        }
    }
}