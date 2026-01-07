# Frontend – Service & Hiring Platform

This folder contains the **frontend application** for a platform that connects **service seekers**, **service providers**, and **companies** in a Twitter-like social environment with paid consultations, projects, and hiring workflows.

⚠️ **Project Status:**  
This project is currently **under active development**. It is a **work in progress**, and many features, improvements, and architectural updates will be added gradually according to the product roadmap and execution plan.

---

## 🧠 Product Overview (Frontend Scope)

The platform supports three main user groups:

### 1. Service Seekers
- Ask questions in different domains (tech, business, HR, accounting, etc.)
- Post project or service requirements
- Chat with service providers
- Unlock paid chats or services after free limits

### 2. Service Providers
- Answer questions
- Offer paid consultations
- Provide freelance or contract services
- Participate in hiring, resume screening, and interviews

### 3. Companies / Recruiters
- Post hiring requirements
- Run candidate screening and interview workflows
- Use distributed hiring support from verified professionals
- Pay for ads, hiring tools, and services

---

## 🖥️ Technology Stack (Initial)

Chosen to be **simple at start** and **scalable later**.

- **Framework**: React
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **State Management**: React Context (Redux later if needed)
- **API Communication**: Fetch / Axios
- **Authentication**: Token-based (handled by backend)
- **Real-time Communication**: WebSockets (planned)
- **Payments (UI)**: Razorpay / Stripe (future integration)

---

## 🎯 Key Features (MVP)

- User authentication UI
- Twitter-like public feed
- Question & answer posts
- Domain-based content visibility
- User profiles and professional details
- Limited free chat between users
- Paid chat and service unlock (UI only)

---

## 🧩 Hiring & Screening (UI Scope)

The frontend will support:
- Job posting views
- Resume upload and preview
- Candidate shortlisting dashboards
- Interview scheduling interfaces
- Screening task & DSA round UI

> Core hiring logic, payments, and verification are handled by backend services.

---

## 🔐 Authentication & Roles

Frontend renders UI based on user roles:
- Service Seeker
- Service Provider
- Company / Recruiter
- Admin (internal)

Authentication and role validation are managed by backend APIs.

---

## 💳 Monetization (Frontend Responsibility)

- Subscription plan selection UI
- Paid chat unlock screens
- Project payment initiation UI
- Hiring service payment UI

---

## 🚀 Running the Frontend

```bash
npm install
npm run dev
