pipeline {
    agent any

    environment {
        PORT = '3000'
        VITE_BASE_URL = 'http://localhost:3050/api'
        PM2_HOME = 'C:\\tools\\.pm2'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/enunez-dev/sys-frontend.git', branch: 'deploy-edward'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Build with Vite') {
            steps {
                bat 'npx tsc -b && npx vite build'
            }
        }
        stage('Deploy with PM2') {
            steps {
                script {
                    try {
                        bat 'pm2 stop sys-frontend || echo "No previous instance running"'
                        bat 'pm2 delete sys-frontend || echo "No previous instance to delete"'
                    } catch (Exception e) {
                        echo 'No previous app instance running or failed to stop'
                    }
                    bat 'pm2 serve dist %PORT% --name "sys-frontend" --spa'
                    bat 'pm2 save'
                }
            }
        }
    }
    post {
        always {
            echo 'Proceso de despliegue del frontend completado.'
        }
        failure {
            echo 'El despliegue falló, revisa los logs para más detalles.'
        }
    }
}
