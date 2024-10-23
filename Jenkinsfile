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
        stage('Find PM2 Path') {
            steps {
                script {
                    // Capturar el nombre de usuario actual usando PowerShell
                    def loggedUser = bat(script: 'powershell -Command "(Get-WmiObject -Class Win32_ComputerSystem).UserName.Split(\'\\\\\')[1]"', returnStdout: true).trim()
                    loggedUser = loggedUser.split("\r\n")[-1].trim()
                    echo "loggedUser: ${loggedUser}"
                    // Intentar encontrar pm2 en una ruta común de instalación global
                    def possiblePm2Paths = [
                        "C:\\Users\\${loggedUser}\\AppData\\Roaming\\npm\\pm2.cmd",
                        "C:\\Program Files\\nodejs\\pm2.cmd",
                    ]
                    echo "possiblePm2Paths: ${possiblePm2Paths}"
                    def foundPm2Path = possiblePm2Paths.find { path ->
                        fileExists(path)
                    }

                    if (foundPm2Path) {
                        env.PM2_PATH = foundPm2Path
                        echo "PM2 se encuentra en: ${env.PM2_PATH}"
                    } else {
                        error "No se pudo encontrar la ruta de PM2 en las ubicaciones conocidas"
                    }
                }
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
                        // Detener cualquier instancia anterior
                        bat "\"${env.PM2_PATH}\" stop sys-frontend || echo \"No previous app instance running\""
                        bat "\"${env.PM2_PATH}\" delete sys-frontend || echo \"No previous app instance to delete\""
                    } catch (Exception e) {
                        echo 'No previous app instance running or failed to stop'
                    }
                    // Iniciar la aplicación con PM2 en segundo plano
                    bat "\"${env.PM2_PATH}\" serve dist %PORT% --name \"sys-frontend\" --spa"
                    // Guardar la lista de procesos de PM2
                    bat "\"${env.PM2_PATH}\" save"
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
