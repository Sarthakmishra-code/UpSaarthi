UpSaarthi – Backend

A production-ready backend for UpSaarthi, an Expert Marketplace platform that connects users with verified experts for question–answer support and real-time chat.
This repository contains only the backend services, built using Node.js, Express, MongoDB, and a clean modular architecture.




🏗️ Backend Architecture
backend/
├── src/
│   ├── models/           # Mongoose schemas
│   ├── dao/              # Data Access Objects (DB abstraction)
│   ├── services/         # Business logic layer
│   ├── controllers/      # HTTP controllers
│   ├── routes/           # API routes
│   ├── middleware/       # Auth, role checks, validation
│   ├── utils/            # Helper utilities
│   └── config/           # Database & app configuration
├── scripts/              # Admin & maintenance scripts
├── server.js             # Application entry point (root)
├── package.json
├── .env.example          # Environment template (committed)
├── .env                  # Environment config (NOT committed)
└── .gitignore




Architecture Principles

Layered architecture (Controller → Service → DAO → Model)

Clear separation of concerns

Highly scalable & maintainable

Industry-standard backend structure



🚀 Tech Stack
Backend

Node.js

Express.js

MongoDB (Mongoose ODM)

Authentication & Security

JWT (JSON Web Tokens)

bcryptjs for password hashing

Role-based access control (Admin / Expert / Asker)





Utilities

express-validator

dotenv

cors