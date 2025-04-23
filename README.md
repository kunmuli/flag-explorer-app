# 🌍 Flag Explorer App

A full-stack application built as part of a coding challenge. It features a RESTful backend API and a modern frontend UI to explore country flags and information.

## Overview

This app allows users to:

- View a grid of country flags using the [REST Countries API](https://restcountries.com/v3.1/all)
- Click on a flag to view detailed information (name, capital, population)
- Query country details via a custom backend API
- Run tests and build both frontend and backend with CI/CD integration
- Deploy the backend as a containerized application to AWS ECS using AWS CodeDeploy
- Deploy the frontend as static files to AWS S3

---

## Tech Stack

**Frontend:**

- React

**Backend:**

- Node.js (**Developed with v20.19.0**)
- Express.js
- Jest for testing
- Docker (for containerization)

**Deployment:**

- AWS CodeBuild (for CI/CD pipeline)
- Amazon ECR (for Docker image registry)
- Amazon ECS (for container orchestration)
- AWS CodeDeploy (for backend deployment to ECS)
- Amazon S3 (for frontend static file hosting)

---

## Getting Started

### Prerequisites

- Node.js (**v20.19.0** - the version used during development is recommended for consistency)
- Docker (optional for local container development)
- npm or yarn
- AWS CLI configured with appropriate credentials (for deployment)

### Running Frontend and Backend Locally (Separate Terminals)

To run the frontend and backend applications simultaneously on your local machine, you will need to open two separate terminal windows or tabs.

#### Running the Backend

1.  **Open a new terminal window or tab.**
2.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
3.  **Install the backend dependencies:**
    ```bash
    npm install
    ```
4.  **Start the backend server:**
    ```bash
    npm start
    ```
    You should see output indicating that the backend server is running, typically on `http://localhost:3001`.

#### Running the Frontend

1.  **Open another new terminal window or tab.**
2.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
3.  **Install the frontend dependencies:**
    ```bash
    npm install
    ```
4.  **Copy the environment config**
    ```bash
    cp .env.example .env
    ```
    This sets up the required environment variables needed for the frontend to run correctly.
5.  **Start the frontend development server:**
    ```bash
    npm start
    ```
    This command usually opens the frontend application in your default web browser, typically at `http://localhost:3000`. The frontend is configured to communicate with the backend API running on `http://localhost:3001`.

---

## API Endpoints

Based on the provided Swagger specification:

### `GET /countries`

Returns a list of all countries.

### `GET /countries/{name}`

Returns details about a specific country by name.
Response includes: `name`, `population`, `capital`, `flag`

---

## Running Tests

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

---

## CI/CD Pipeline & Deployment

This project utilizes AWS CodeBuild for its CI/CD pipeline, which is configured via buildspec.yml. The pipeline performs the following steps:

- Installs necessary dependencies for both frontend and backend.
- Runs unit tests for both the backend and frontend to ensure code quality.
- Builds the backend application and creates a Docker image. This image is then pushed to Amazon ECR (Elastic Container Registry).
- Builds the frontend application, generating static files optimized for deployment.
- **Deploys the backend:** Uses AWS CodeDeploy to deploy the new Docker image to an Amazon ECS (Elastic Container Service) cluster. This involves updating the task definition of the ECS service. The deployment is configured using appspec.yml.
- **Deploys the frontend:** Syncs the built frontend static files to an Amazon S3 (Simple Storage Service) bucket, which is configured for static website hosting.

To set up the CI/CD pipeline, you will need to:

1. Create an ECR repository named flag-explorer-backend.
2. Create an S3 bucket to host the frontend files (replace ${FRONTEND_BUCKET} in buildspec.yml with your bucket name).
3. Create an ECS cluster named flag-explorer-cluster.
4. Create an ECS service named flag-explorer-backend-service that uses a task definition referencing the flag-explorer-backend container on port 3001 and is connected to a load balancer.
5. Create an AWS CodeBuild project configured to use the provided buildspec.yml. Ensure the environment variables (AWS_REGION, ECR_REPOSITORY, FRONTEND_BUCKET, ECS_CLUSTER, ECS_SERVICE) are set in the CodeBuild project settings.
6. Create an AWS CodeDeploy application and deployment group targeting your ECS service. Configure the deployment group to use the provided appspec.yml. Ensure the deployment group has the necessary permissions to interact with ECS.

---

## Project Structure

```
flag-explorer-app/
│
├── backend/
│   ├── index.js
│   ├── services/
│   ├── tests/
│   └── Dockerfile
│
├── frontend/
│   ├── public/
│   ├── src/
│   └── .env
│
├── buildspec.yml
├── appspec.yml
└── .gitignore
```

---

## License

This project is licensed under the GNU General Public License v3.0.  
See the [LICENSE](https://www.gnu.org/licenses/gpl-3.0.en.html) file for details.
