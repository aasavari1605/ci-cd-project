pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Fetching latest code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images for microservices...'
                bat 'docker build -t user-service:1.0 ./user-service'
                bat 'docker build -t order-service:1.0 ./orrder-service'
            }
        }

        stage('Run Containers') {
            steps {
                echo 'Starting services with Docker Compose...'
                bat 'docker-compose up -d'
                sleep time: 15, unit: 'SECONDS'  // wait for containers to start
            }
        }

        stage('Verify Deployment') {
            steps {
                echo "Testing Order Service Root (Health Check):"
                bat '''
                powershell -NoProfile -ExecutionPolicy Bypass -Command ^
                "& { $response = Invoke-WebRequest -Uri http://localhost:3002/ -UseBasicParsing; $response | Format-List * }"
                '''

                echo "Testing Order Service /orders Endpoint:"
                bat '''
                powershell -NoProfile -ExecutionPolicy Bypass -Command ^
                "& { $response = Invoke-WebRequest -Uri http://localhost:3002/orders -UseBasicParsing; $response | Format-List * }"
                '''

                echo "✅ Deployment verification successful! Services are running."
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
