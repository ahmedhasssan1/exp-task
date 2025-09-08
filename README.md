<div align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</div>

<h1 align="center">Global Expansion Management API</h1>

<p align="center">
  A specialized <strong>NestJS backend</strong> crafted for <strong>Expander360</strong>, streamlining global business ventures. This system orchestrates clients, service providers, ventures, research insights, and data analysis, harmonizing MySQL and MongoDB.
</p>

<p align="center">
  <a href="[Your NPM Package Link]" target="_blank">
    <img src="https://img.shields.io/npm/v/[Your NPM Package Name].svg" alt="NPM Version" />
  </a>
  <a href="[Your License Link]" target="_blank">
    <img src="https://img.shields.io/npm/l/[Your NPM Package Name].svg" alt="License" />
  </a>
   <img src="https://img.shields.io/badge/Status-Under%20Active%20Development-yellow" alt="Development Status" />
</p>

---

## ✨ Key Functionalities

*   **Secure Access**: JSON Web Token (JWT) authentication with role-based authorization.
*   **Data Harmony**: Integrates relational (MySQL) and document (MongoDB) databases.
*   **Intelligent Matching**: Connects ventures with service providers based on geography, expertise, success metrics and response time agreements.
*   **Knowledge Hub**: Manages research documents using MongoDB GridFS.
*   **Real-time Updates**: Sends email notifications for new connections and agreement status.
*   **Automated Processes**: Schedules tasks for agreement monitoring and connection optimization.
*   **Containerized Deployment**: Ready for Docker, simplifying setup.

---

## 💻 Core Technologies

| Component      | Technology Stack            |
| :------------- | :-------------------------- |
| Backend        | NestJS (TypeScript)         |
| Authorization  | JWT, Custom Role Guards     |
| Data Storage   | MySQL (TypeORM), MongoDB (Mongoose) |
| Queueing       | Redis, BullMQ               |
| File System    | MongoDB GridFS              |
| Task Scheduler | NestJS Task Scheduling      |
| Containerization | Docker                      |

---

## 🚀 Setup Instructions

### Prerequisites

*   Node.js (v18 or higher)
*   Docker & Docker Compose
*   MySQL (v8+)
*   MongoDB (v5+)
*   Redis (v6+)

### Local Installation

1.  **Clone:**

    ```bash
    git clone [repository URL]
    cd [project directory]
    ```

2.  **Configuration:**

    ```bash
    cp .env.example .env
    # Update .env with your specific settings
    ```

3.  **Dockerized Start:**

    ```bash
    docker-compose up -d
    ```

    *or for local development:*

    ```bash
    npm install
    npm run migration:run
    npm run start:dev
    ```

---

## 🗂️ Project Structure

```text
src/
├── admin/         # Admin-specific features
├── auth/          # Authentication and authorization
├── users/         # User management
├── clients/       # Client-related code
├── common/        # Reusable utilities
├── projects/      # Venture management
├── vendors/       # Service provider management
├── matches/       # Connection algorithms
├── documents/     # Document handling
├── scheduler/     # Scheduled processes
├── email/         # Email communication
└── database/      # Database setup



erDiagram
    CLIENTS {
        int id PK
        string company_name
        string contact_email
    }
    PROJECTS {
        int id PK
        int client_id FK
        string country
        string[] services_needed
        decimal budget
        enum status
    }
    VENDORS {
        int id PK
        string name
        string[] countries_supported
        string[] services_offered
        decimal rating
        int response_sla_hours
    }
    MATCHES {
        int id PK
        int project_id FK
        int vendor_id FK
        decimal score
        datetime created_at
    }
    CLIENTS ||--o{ PROJECTS : "owns"
    PROJECTS ||--o{ MATCHES : "has"
    VENDORS ||--o{ MATCHES : "matches"