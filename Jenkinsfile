pipeline {
    agent any

    // Définition des outils nécessaires pour compiler le code source
    tools {
        nodejs 'Node20' // Ce nom correspond à la configuration dans Jenkins > Global Tool Configuration
    }

    stages {
        // ----------------------------------------------------------------------
        // ÉTAPE 1 : VÉRIFICATION ET COMPILATION DU BACKEND
        // ----------------------------------------------------------------------
        stage('CI: Build Backend (Java)') {
            steps {
                echo "=== Lancement de la compilation Java avec Maven ==="
                dir('mainframe-api') {
                    // Ajout des droits d'exécution au wrapper Maven et compilation
                    sh 'chmod +x mvnw'
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        // ----------------------------------------------------------------------
        // ÉTAPE 2 : VÉRIFICATION ET COMPILATION DU FRONTEND
        // ----------------------------------------------------------------------
        stage('CI: Build Frontend (Angular)') {
            steps {
                echo "=== Lancement de la compilation Angular avec Node.js ==="
                dir('mainframe-ui') {
                    // Installation des paquets npm et construction du projet
                    sh 'npm install'
                    sh 'npm run build -- --configuration production'
                }
            }
        }
    }
    
    post {
        success {
            echo "Pipeline CI terminé avec succès ! Le code source est valide et compile parfaitement."
        }
        failure {
            echo "Échec du pipeline CI. Vérifiez les logs pour corriger le code source."
        }
    }
}