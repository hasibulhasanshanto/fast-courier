# 📦 Courier Application Monorepo

A comprehensive, production-ready Courier and Delivery Management System. This repository houses both the frontend (React + Zustand + React Router) and backend (Express.js + Node) ecosystems structured via a domain-driven, modular pattern.

---

## 🏗️ Project Architecture

This workspace is structured to separate concerns while ensuring that features correspond closely between the client and the server.

```text
courier-app/
├── frontend/               # React Client SPA
│   └── src/
│       ├── config/         # Global setups (Axios instances, interceptors)
│       └── features/       # Domain-driven feature modules (Auth, Shipments, etc.)
├── backend/                # Express.js REST API
│   └── src/
│       ├── config/         # Database and infrastructure settings
│       └── modules/        # Domain-driven feature modules (Controllers, Services)
├── .prettierrc             # Root formatting configurations (Shared styles)
└── README.md               # Workspace documentation

```

---

## 🛠️ Tech Stack & Key Integrations

### Frontend

- **Framework:** React with Vite
- **State Management:** Zustand (Isolated, feature-specific slice stores)
- **Routing:** React Router (With client-side authentication guards)
- **Form & Validation:** Yup (Declarative validation schemas)
- **HTTP Client:** Axios (With centralized request/response security interceptors)

### Backend

- **Runtime:** Node.js + Express.js
- **Architecture:** Controller-Service-Repository Pattern
- **Security:** JWT Authentication middleware, password hashing, and centralized error handling
- **Validation:** Server-side request validation middleware matching structural UI rules

---

## ⚙️ Shared Code Formatting Rules

The ecosystem enforces a strict unified code style defined in `.prettierrc`:

- **Indentation:** `2 Spaces` (No hard tabs)
- **Semicolons:** `Disabled` (Clean lines without trailing `;`)
- **Quotes:** `Single Quotes` (`'example'`)
- **Line Length:** `100 characters max` before wrapping

---

## 🚀 Getting Started

### 1. Project Initialization & Setup

Clone the repository and install dependencies in each respective ecosystem workspace:

```bash
# Clone the repository
git clone [https://github.com/your-username/courier-app.git](https://github.com/your-username/courier-app.git)
cd courier-app

# Setup Code Formatter
# Ensure your editor (e.g., VS Code) reads the root `.prettierrc`

```

### 2. Backend Initialization

```bash
cd backend

# Install dependencies
npm install  # or pnpm install / yarn install

# Configure environment variables
cp .env.example .env  # Add your DB URI, JWT Secret, and Port

```

### 3. Frontend Initialization

```bash
cd ../frontend

# Install dependencies
npm install  # or pnpm install / yarn install

```

### 4. Running the Development Servers

#### Booting the API Gateway (Backend):

```bash
cd backend
npm run dev

```

_Server typically initializes on: `http://localhost:5000_`

#### Booting the Client Web App (Frontend):

```bash
cd frontend
npm run dev

```

_Application typically maps onto: `http://localhost:5173_`

---

## 📂 Structural Deep Dive

### Client Feature Anatomy

Every module folder nested inside `frontend/src/features/` handles its concerns autonomously:

- `components/` - View components scoped strictly to this specific feature domain.
- `services/` - Direct axios integration endpoints (e.g., `shipmentApi.js`).
- `store/` - Zustand global reactive state manager slices.
- `schemas/` - Explicit client-side validation logic built via `yup`.

### API Module Anatomy

Every backend module nested inside `backend/src/modules/` acts independently:

- `*.routes.js` - Endpoint structural tree and applied middleware arrays.
- `*.controller.js` - HTTP payload processing layer (manages requests, maps statuses).
- `*.service.js` - Core business engine calculations, transactional updates, logic flows.
- `*.model.js` - Data layer entities or schemas mapping explicitly to the database.

---

## 📄 License

This ecosystem project is distributed under the MIT License. See `LICENSE` for further operational legal rights.
