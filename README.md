<p align="center"> <a href="http://nestjs.com/" target="blank"> <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /> </a> </p> <p align="center"> A progressive <strong>NestJS-based backend</strong> designed for <strong>Expander360</strong>, a platform that helps businesses manage global expansion projects. The system connects clients, vendors, projects, unstructured research documents, and analytics across MySQL and MongoDB. </p> <p align="center"> <a href="https://www.npmjs.com/~nestjscore" target="_blank"> <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /> </a> <a href="https://www.npmjs.com/~nestjscore" target="_blank"> <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /> </a> <a href="https://discord.gg/G7Qnnhy" target="_blank"> <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/> </a> <img src="https://img.shields.io/badge/Status-Production%20Ready-green.svg" alt="Production Ready" /> </p> --- ## 📌 Features - 🔐 **JWT Authentication & RBAC** → Roles: client & admin - 🗄 **Relational + Non-Relational DB Integration** → MySQL + MongoDB - 📁 **Research Document Management** → Upload, search, and fetch reports - 🤝 **Project-Vendor Matching Algorithm** → Based on country, services, rating, and SLA - 📊 **Analytics API** → Combines MySQL + MongoDB insights - 📬 **Email Notifications** → When new matches are generated - ⏳ **Scheduled Jobs** → Auto-refresh matches & flag expired SLAs - 🐳 **Dockerized Setup** → MySQL, MongoDB, Redis, and API containers - 🚀 **Cloud Ready** → Deploy to **Render**, **Railway**, or **AWS Free Tier** --- ## 🛠 Tech Stack | Layer | Technology | |-------------|-----------| | Framework | NestJS (TypeScript) | | Auth | JWT + Role Guards | | Relational DB | MySQL (TypeORM) | | NoSQL DB | MongoDB (Mongoose) | | Cache / Queues | Redis + BullMQ | | File Storage | MongoDB GridFS | | Scheduling | NestJS Scheduler / BullMQ | | Deployment | Docker + Docker Compose | --- ## 🚀 Quick Start ### Prerequisites - Node.js (v18 or higher) - Docker & Docker Compose (recommended) - MySQL (v8 or higher) - MongoDB (v5 or higher) - Redis (v6 or higher) ### 🐳 Docker Setup (Recommended)
bash
# 1. Clone the repository
git clone https://github.com/your-username/global-expansion-api.git
cd global-expansion-api

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 3. Start all services
docker-compose up -d

# 5. API will be available at http://localhost:3000
### 📋 Manual Setup
bash
# 1. Install dependencies
npm install


# 2. Set up databases (MySQL, MongoDB, Redis)
# Update .env with your database URLs

# 3. Run migrations and seed data
npm run migration:run
npm run seed

# 4. Start the development server
npm run start:dev
--- ## 📂 Project Structure
src/
├── auth/                   # Authentication module
│   ├── guards/            # JWT & Role guards
│   ├── strategies/        # Passport strategies
│   └── dto/              # Auth DTOs
├── users/                 # User management
├── clients/               # Client profiles
├── projects/              # Project management
├── vendors/               # Vendor management
├── matching/              # Vendor matching algorithm
├── documents/             # Document management (MongoDB)
├── analytics/             # Analytics & reporting
├── notifications/         # Email notifications
├── jobs/                  # Scheduled jobs (BullMQ)
├── common/                # Shared utilities
│   ├── decorators/       # Custom decorators
│   ├── filters/          # Exception filters
│   ├── guards/           # Global guards
│   └── interceptors/     # Response interceptors
└── database/              # Database configuration
    ├── entities/         # TypeORM entities
    ├── migrations/       # Database migrations
    └── seeds/            # Seed data
--- ## 🗄 Database Schema ### MySQL (Relational Data)
mermaid
erDiagram
    Users {
        string id PK
        string email
        string password_hash
        enum role
        datetime created_at
        datetime updated_at
    }
    
    Clients {
        string id PK
        string user_id FK
        string company_name
        string industry
        string headquarters_country
        text description
        datetime created_at
    }
    
    Projects {
        string id PK
        string client_id FK
        string name
        text description
        string target_country
        json required_services
        enum status
        decimal budget
        date start_date
        date end_date
        datetime created_at
    }
    
    Vendors {
        string id PK
        string company_name
        json countries_served
        json services_offered
        decimal rating
        int sla_days
        text contact_info
        enum status
        datetime created_at
    }
    
    ProjectVendorMatches {
        string id PK
        string project_id FK
        string vendor_id FK
        decimal match_score
        json match_criteria
        enum status
        datetime created_at
    }
    
    Users ||--o| Clients : has
    Clients ||--o{ Projects : owns
    Projects ||--o{ ProjectVendorMatches : has
    Vendors ||--o{ ProjectVendorMatches : matches
### MongoDB (Document Data)
json
// Research Documents Collection
{
  "_id": "ObjectId",
  "project_id": "string",
  "title": "string",
  "document_type": "market_research | competitor_analysis | regulatory",
  "content": "string",
  "metadata": {
    "country": "string",
    "industry": "string",
    "tags": ["string"],
    "source": "string"
  },
  "file_id": "GridFS_ObjectId",
  "created_at": "Date",
  "updated_at": "Date"
}




--- ## 🚀 Deployment ### Render 1. Connect your GitHub repository 2. Set environment variables in Render dashboard 3. Deploy with Docker ### Railway
bash
railway login
railway link
railway up
### AWS Free Tier 1. Launch EC2 instance 2. Set up RDS (MySQL) and DocumentDB (MongoDB) 3. Configure ElastiCache (Redis) 4. Deploy using Docker --- ## 🧪 Testing
bash


# Watch mode
npm run start:dev
--- ## 📝 API Usage Examples ### Authentication
bash
# Register new user
curl -X POST http://localhost:3000/api/v1/auth/register \

# Login
curl -X POST http://localhost:3000/auth/login \
### Project Management
bash
# Create project
curl -X POST http://localhost:3000/projects \


# Generate vendor matches
curl -X POST http://localhost:3000/api/v1/matching/generate/PROJECT_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
--- ## 🤝 Contributing 1. Fork the repository 2. Create a feature branch (git checkout -b feature/amazing-feature) 3. Commit your changes (git commit -m 'Add amazing feature') 4. Push to the branch (git push origin feature/amazing-feature) 5. Open a Pull Request ### Development Guidelines - Follow TypeScript best practices - Write unit tests for new features - Update documentation for API changes - Use conventional commit messages - Ensure all tests pass before submitting PR --- ## 📄 License This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. --- ## 📞 Support - **Author**: [Your Name](https://github.com/your-username) - **Website**: [https://expander360.com](https://expander360.com) - **Email**: [support@expander360.com](mailto:support@expander360.com) - **Documentation**: [API Docs](https://your-api-docs.com) --- ## 🙏 Acknowledgments - [NestJS](https://nestjs.com/) - Progressive Node.js framework - [TypeORM](https://typeorm.io/) - Amazing ORM for TypeScript - [Mongoose](https://mongoosejs.com/) - MongoDB object modeling - [BullMQ](https://bullmq.io/) - Premium Queue package --- <p align="center"> Made with ❤️ for global expansion </p>