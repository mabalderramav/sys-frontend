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
                bat 'npm install -g typescript'
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
                        // Detener cualquier instancia anterior de la aplicación servida con PM2
                        bat 'pm2 stop sys-frontend || echo "No previous instance running"'
                        bat 'pm2 delete sys-frontend || echo "No previous instance to delete"'
                    } catch (Exception e) {
                        echo 'No previous app instance running or failed to stop'
                    }

                    // Iniciar la aplicación en segundo plano usando PM2
                    // bat "pm2 start npx --name 'sys-frontend' -- serve -s ${BUILD_DIR} -l 3000"
                    // bat 'pm2 start serve --name "sys-frontend" -- dist -l %PORT%'
                    bat 'pm2 serve dist %PORT% --name "sys-frontend" --spa'

                    // Guardar el estado de PM2 para recuperación automática
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
