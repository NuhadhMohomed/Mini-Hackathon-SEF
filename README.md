# SE3090 Mini Hackathon — MERN Technical Foundation

A clean, modular MERN technical foundation built specifically for the **SE3090 Mini Hackathon**.

> **Note**: The hackathon problem domain has **not** been selected yet. This repository contains only the technical infrastructure and routing foundation without fake domain data, mock business models, or artificial dashboards.

---

## Architecture & Project Structure

The project is structured as a lightweight monorepo containing two **completely independent** applications:

```text
.
├── client/                     # Frontend Application (React + Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI & shadcn/ui components
│   │   │   └── ui/             # Button, Card, Badge, Input primitives
│   │   ├── layouts/            # Application shells (PublicLayout, AppLayout)
│   │   ├── pages/              # Route pages (HomePage, LoginPage, RegisterPage, AppPlaceholderPage, NotFoundPage)
│   │   ├── features/           # Future feature modules (API queries, domain state)
│   │   ├── lib/                # Shared utilities (e.g. cn helper)
│   │   ├── routes/             # Route configurations (AppRoutes.jsx)
│   │   ├── App.jsx             # Root routing wrapper
│   │   ├── main.jsx            # Entrypoint with TanStack Query provider
│   │   └── index.css           # Tailwind base styles & shadcn CSS tokens
│   ├── index.html
│   ├── jsconfig.json           # Path alias definition (@/* -> ./src/*)
│   ├── vite.config.js          # Vite config with API proxy
│   ├── tailwind.config.js      # Tailwind theme tokens
│   ├── postcss.config.js
│   ├── components.json         # shadcn/ui configuration (JavaScript)
│   └── package.json
│
├── server/                     # Backend Application (Node.js + Express)
│   ├── src/
│   │   ├── config/             # Database connection (Mongoose) & configs
│   │   ├── middleware/         # Centralized error handler, 404 handler
│   │   ├── modules/            # Future domain modules (controllers, services, models)
│   │   ├── routes/             # Infrastructure routes (/api/health)
│   │   ├── utils/              # Helper utilities
│   │   ├── app.js              # Express app setup & middleware
│   │   └── server.js           # Server listener & database initialization
│   ├── .env.example            # Environment variables template
│   └── package.json
│
├── .gitignore                  # Comprehensive git ignore rules
└── README.md
```

---

## Locked Technology Stack

### Frontend
- **Framework / Bundler**: React 18 + Vite
- **Language**: JavaScript (ES Modules, strictly **no TypeScript**)
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS + shadcn/ui primitives
- **Data Fetching & Validation**: TanStack React Query + Zod
- **Icons & Helpers**: Lucide React, `clsx`, `tailwind-merge`

### Backend
- **Runtime & Framework**: Node.js (v18+) + Express
- **Language**: JavaScript (ES Modules)
- **Database**: MongoDB Atlas via Mongoose
- **Validation**: Zod
- **Auth Infrastructure**: JWT (Access + Refresh tokens), bcryptjs password hashing
- **Utilities**: CORS, Cookie-Parser, Morgan, Dotenv

---

## Getting Started

The client and server run as independent applications. Open two terminal windows:

### 1. Backend Setup (`/server`)

```bash
cd server

# Copy environment variables template
cp .env.example .env

# Install backend dependencies
npm install

# Run backend development server with hot-reload
npm run dev
```

- **Server URL**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/api/health`

### 2. Frontend Setup (`/client`)

```bash
cd client

# Install frontend dependencies
npm install

# Run frontend development server
npm run dev
```

- **Client URL**: `http://localhost:5173`
- **Vite Proxy**: Requests to `/api/*` are automatically proxied to `http://localhost:5000` during development.

---

## Available Frontend Routes

| Route | Layout | Purpose |
|---|---|---|
| `/` | `PublicLayout` | Neutral landing page verifying foundation tools & navigation |
| `/login` | `PublicLayout` | Authentication placeholder (clean card & input structure) |
| `/register` | `PublicLayout` | User registration placeholder |
| `/app` | `AppLayout` | Protected application shell template ready for future domain pages |
| `*` | `PublicLayout` | Responsive 404 / Not Found page with return-to-home action |

---

## Environment Variables Reference (`server/.env`)

| Variable | Description | Example / Default |
|---|---|---|
| `PORT` | Port for the Express backend server | `5000` |
| `NODE_ENV` | Runtime environment | `development` |
| `CLIENT_URL` | Frontend origin for CORS policy | `http://localhost:5173` |
| `MONGODB_URI` | MongoDB connection string (Atlas or local) | `mongodb+srv://...` |
| `JWT_ACCESS_SECRET` | Secret key for short-lived access tokens | Random 64-char string |
| `JWT_REFRESH_SECRET`| Secret key for refresh tokens | Random 64-char string |
| `JWT_ACCESS_EXPIRES_IN` | Access token lifespan | `15m` |
| `JWT_REFRESH_EXPIRES_IN`| Refresh token lifespan | `7d` |

---

## Campus / Institutional Network Note

If you are working on a campus or corporate network with firewall restrictions that block `registry.npmjs.org` with an *Application Control Violation*, an `.npmrc` file is included that points npm to `https://registry.npmmirror.com/` (a fast, transparent mirror with valid public SSL certificates).

---

## Development Guidelines for the Hackathon

1. **JavaScript Only**: Do not introduce TypeScript (`.ts`/`.tsx`) files.
2. **Keep it Lightweight**: Avoid adding Redux, Docker, microservices, or complex enterprise abstractions during a short hackathon.
3. **Domain Implementation**: Once the team selects the problem domain:
   - Place backend business models, controllers, and services inside `server/src/modules/<feature-name>/`.
   - Place frontend domain components and pages inside `client/src/pages/` and `client/src/features/<feature-name>/`.
4. **Preserve Path Aliases**: Use `@/*` for client imports (e.g. `import { Button } from '@/components/ui/button'`).
