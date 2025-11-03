pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'ash1185'  // 🧠 your Docker Hub username
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Fetching latest code from GitHub...'
                checkout scm
            }
        }

        stage('Build Node.js Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                bat '''
                cd user-service
                if exist node_modules rmdir /s /q node_modules
                del package-lock.json 2>nul
                npm cache clean --force
                npm install --no-fund --no-audit
                cd ..
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images for microservices...'
                bat 'docker build -t %DOCKER_HUB_USER%/user-service:1.0 ./user-service'
                bat 'docker build -t %DOCKER_HUB_USER%/orrder-service:1.0 ./orrder-service'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing Docker images to Docker Hub...'
                withCredentials([string(credentialsId: 'dockerhub-token', variable: 'DOCKER_HUB_PASS')]) {
                    bat 'echo %DOCKER_HUB_PASS% | docker login -u %DOCKER_HUB_USER% --password-stdin'
                    bat 'docker push %DOCKER_HUB_USER%/user-service:1.0'
                    bat 'docker push %DOCKER_HUB_USER%/orrder-service:1.0'
                }
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                echo 'Starting services using docker-compose...'
                bat 'docker-compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking running containers...'
                bat 'docker ps'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up containers after pipeline run...'
            bat 'docker-compose down'
        }
    }
}
