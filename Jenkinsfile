pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Fetching latest code from GitHub...'
                checkout scm
            }
        }

        stage('Build User Service') {
            steps {
                echo 'Installing Node.js dependencies for User Service...'
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
                bat 'docker build -t ash1185/user-service:1.0 ./user-service'
                bat 'docker build -t ash1185/orrder-service:1.0 ./orrder-service'
            }
        }

        stage('Run Containers with Docker Compose') {
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
            echo 'Stopping containers after pipeline run...'
            bat 'docker-compose down'
        }
    }
}
