pipeline {
    agent any

    tools {
        nodejs 'Node20'
    }

    stages {
        stage('Build Backend Java') {
            steps {
                echo "=== Lancement du build Maven pour Java ==="
                dir('mainframe-api') {
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend Angular') {
            steps {
                echo "=== Lancement du build Node/Angular ==="
                dir('mainframe-ui') {
                    sh 'npm install'
                    sh 'npm run build -- --configuration production'
                }
            }
        }
    }
    
    post {
        success {
            echo "Pipeline Jenkins termine avec succes !"
        }
        failure {
            echo "Le pipeline a echoue. Va voir les logs !"
        }
    }
}
