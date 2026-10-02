<div align="center">

# 🛒 E-Commerce

### A full-stack MERN e-commerce platform with secure auth, Razorpay payments, and admin analytics

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![Express](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/) [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/) [![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/) [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)


🔗 **Live Demo:** [_LIVE LINK_](https://e-commerce-garvit-full-stack.onrender.com/)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Overview](#-api-overview)
- [Security Notes](#-security-notes)
- [Roadmap](#-Future_Plans)
- [Contributing](#-contributing)
- [Author](#-author)

## 📖 About

**E-Commerce** is a full-stack online shopping platform built on the MERN stack (MongoDB, Express, React, Node.js). The backend exposes a REST API covering authentication, product catalog management, order processing, payments, and admin-facing sales analytics, with a React front end consuming it.

Beyond being a working store, this project doubles as a system design playground — it's the base I'm extending with caching, event streaming, and service decomposition as it grows (see [Roadmap](#-Future_Plans)).

## ✨ Features

- 🔐 **Secure Authentication** — JWT-based sessions with hashed passwords (`bcryptjs`) and httpOnly cookies
- 🛍️ **Product Catalog** — Endpoints for browsing and managing products
- 📦 **Order Management** — Place, track, and manage orders
- 💳 **Payments** — Checkout integration via **Razorpay**
- 🖼️ **Image Uploads** — Product images handled with **Multer** and hosted on **Cloudinary**
- 📧 **Transactional Emails** — Order and account emails via **Brevo**
- 📊 **Admin Analytics** — Dedicated analytics endpoints for sales and order insight
- 🌐 **CORS-Ready API** — Configured for a separately hosted client, with credentialed cross-origin requests

## 🧰 Tech Stack

**Backend**

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB + Mongoose |
| Authentication | JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `cookie-parser` |
| Payments | Razorpay |
| Media Handling | Cloudinary, Multer |
| Email | Brevo |
| Config | dotenv |
| HTTP Client | Axios |

**Frontend**

| Category | Technology |
|---|---|
| Library | React |

**Dev Tooling**

- `concurrently` — runs the client and server together in development
- `cors` — cross-origin resource sharing control

## 📁 Project Structure

```
E-Commerce/
├── backend/
│   ├── config/
│   │   └── dbConnect.js         # MongoDB connection setup
│   └── routes/
│       ├── auth.js              # /api/auth
│       ├── productRoute.js      # /api/products
│       ├── orderRoute.js        # /api/orders
│       └── analyticsRoute.js    # /api/analytics
├── frontend/                    # React client app
├── index.js                     # Express app entry point
├── package.json
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- API credentials for Cloudinary, Razorpay, and Resend (for full functionality)

### Installation

```bash
# Clone the repository
git clone https://github.com/Garvit711/E-Commerce.git
cd E-Commerce

# Install both backend and frontend dependencies
npm run install-all
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Server
PORT=8000
CLIENT_URL=http://localhost:3000

# Database
MONGO_URI=your_mongodb_connection_string

# Auth
JWT_SECRET=your_jwt_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email
BREVO_API_KEY=your_brevo_api_key
```

> Variable names above follow common convention — double-check them against whatever `backend/config` and the route/controller files actually read, and adjust as the implementation evolves.

If the frontend needs to know the API's base URL, add a separate `.env` inside `frontend/` (e.g. `REACT_APP_API_URL=http://localhost:8000`).

### Running Locally

```bash
# Run backend + frontend together
npm run dev

# Or run them individually
npm run dev:server   # backend only  → http://localhost:8000
npm run dev:client   # frontend only → http://localhost:3000
```

### Build for Production

```bash
npm run build
```

## 📡 API Overview

All routes are mounted under `/api`:

| Route | Handles |
|---|---|
| `/api/auth` | User registration, login, logout, and session handling |
| `/api/products` | Product listing, details, and catalog management |
| `/api/orders` | Order creation, retrieval, and status updates |
| `/api/analytics` | Sales and order analytics (admin-facing) |

## 🔒 Security Notes

- Passwords are hashed with **bcrypt.js** before storage — plaintext is never persisted
- Sessions use **JWTs** delivered via httpOnly cookies (`cookie-parser`), reducing exposure to XSS token theft
- **CORS** is locked to a single configured `CLIENT_URL` with credentials enabled, rather than left open to all origins
- `trust proxy` is enabled so secure cookies and client IPs resolve correctly behind a reverse proxy (e.g. Render, Railway, or similar platforms)

## 🧭 Future_Plans

Planned enhancements as the project grows into a more distributed system:

- [ ] **Redis** caching for hot reads (product catalog, sessions)
- [ ] **Kafka**-based event streaming for order and inventory events
- [ ] Decomposition into **microservices** (auth, catalog, orders, payments)
- [ ] **Docker** + `docker-compose` for local multi-container orchestration
- [ ] **CI/CD** pipeline via GitHub Actions
- [ ] Rate limiting and request throttling
- [ ] Background job processing for emails and notifications
- [ ] Product search

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request


<div align="center">

If you found this project useful, consider giving it a ⭐

</div>
