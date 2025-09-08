<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  A progressive <strong>NestJS-based backend</strong> designed for <strong>Expander360</strong>, a platform that helps businesses manage global expansion projects.
  The system connects clients, vendors, projects, unstructured research documents, and analytics across MySQL and MongoDB.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  <img src="https://img.shields.io/badge/Status-Production%20Ready-green.svg" alt="Production Ready" />
</p>

---

## 📌 Features
- 🔐 **JWT Authentication & RBAC** → Roles: `client` & `admin`
- 🗄 **Relational + Non-Relational DB Integration** → MySQL + MongoDB
- 📁 **Research Document Management** → Upload, search, and fetch reports
- 🤝 **Project-Vendor Matching Algorithm** → Based on country, services, rating, and SLA
- 📊 **Analytics API** → Combines MySQL + MongoDB insights
- 📬 **Email Notifications** → When new matches are generated
- ⏳ **Scheduled Jobs** → Auto-refresh matches & flag expired SLAs
- 🐳 **Dockerized Setup** → MySQL, MongoDB, Redis, and API containers
- 🚀 **Cloud Ready** → Deploy to **Render**, **Railway**, or **AWS Free Tier**

---

## 🛠 Tech Stack

| Layer        | Technology          |
|-------------|---------------------|
| Framework   | NestJS (TypeScript) |
| Auth        | JWT + Role Guards   |
| Relational DB | MySQL (TypeORM)   |
| NoSQL DB    | MongoDB (Mongoose)  |
| Cache/Queue | Redis + BullMQ      |
| File Storage| MongoDB GridFS      |
| Scheduling  | NestJS Scheduler    |
| Deployment  | Docker + Railway    |

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v18+)
- Docker & Docker Compose
- MySQL v8+
- MongoDB v5+
- Redis v6+

### **🐳 Docker Setup (Recommended)**
```bash
# 1. Clone the repository
git clone https://github.com/your-username/global-expansion-api.git
cd global-expansion-api

# 2. Configure environment variables
cp .env.example .env
# Update .env with your database URLs & secrets

# 3. Start containers
docker-compose up -d

# 4. App will be available at http://localhost:3000

# 1. Install dependencies
npm install

# 2. Run migrations & seed data
npm run migration:run
npm run seed

# 3. Start development server
npm run start:dev


src/

├── admin/  
├── auth/              # Authentication module
├── users/             # User management
├── clients/           # Client profiles
├── common/            #common and can be use all over the oriject
├── projects/          # Project management
├── vendors/           # Vendor management
├── matches/           # Vendor matching algorithm
├── documents/         # Document management (MongoDB)
├── scheduler/         # Scheduled jobs
├── email/             # Email notifications
└── database/          # TypeORM & Mongoose configs


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

    CLIENTS ||--o{ PROJECTS : owns
    PROJECTS ||--o{ MATCHES : has
    VENDORS ||--o{ MATCHES : matches
