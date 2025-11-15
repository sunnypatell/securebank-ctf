<div align="center">
  <h2>SecureBank Frontend (Next.js)</h2>
  <p><i>App Router • TypeScript • Tailwind • better-sqlite3</i></p>
  <img alt="Next" src="https://img.shields.io/badge/Next.js-15-black?logo=next.js"> <img alt="React" src="https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white"> <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white"> <img alt="Node" src="https://img.shields.io/badge/Node.js-%E2%89%A5%2018-339933?logo=node.js&logoColor=white">
</div>

## Setup and Installation

Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)

Install

```bash
cd frontend
npm ci
```

Environment
- Create `./.env.local` with: `COOKIE_SECRET=your-strong-random-value`
- Note: A default value exists in the repo for convenience. Replace for demos.

## Scripts

```bash
npm run dev    # Start dev server (Turbopack)
npm run build  # Production build
npm run start  # Start production server (defaults to :3000)
npm run lint   # ESLint
```

## Run Locally

```bash
cd frontend
npm ci
npm run dev
# http://localhost:3000
```

Testing credentials (or register your own):
- `admin` / `admin123`
- `sunny.admin` / `sunny.admin123`

## Folder Layout

```
frontend/
├─ app/
│  ├─ api/{feedback,get-session,login,logout,register,transactions}
│  ├─ dashboard/{feedback,transactions,new}
│  ├─ help-faq/ • login/ • register/ • public/discussions/
│  └─ layout.tsx • page.tsx • globals.css
├─ database/db.ts
├─ lib/{utils.ts,next-connect.d.ts}
├─ public/*
└─ package.json • tailwind.config.ts • tsconfig.json
```

## Notes for Development

- Uses `better-sqlite3` with a local SQLite DB for simplicity and performance.
- Auth is via signed cookies (`cookie-signature`) storing `{ username, role }`.
- App intentionally contains vulnerable flows for CTF exercises (do not patch unless challenge-specific).

## Docker

Use the root-level `Dockerfile`. See the repository `README.md` for full Docker instructions.

---

<details>
<summary><strong>Original README Content (Preserved)</strong></summary>

## Setup and Installation

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher)

### Installation Steps

1. **Navigate to Project Directory (from Root)**:
```bash
   cd frontend
   ```

2. **Install dependencies**:
```bash
   npm ci
```
   Note: We use `npm ci` instead of `npm install` to ensure exact versions from package-lock.json are installed.

3. **Set up environment variables (Already comitted in Repo)**:
   Create a `.env.local` file in the root directory with the following variables:
   # Required for cookie signing
   `COOKIE_SECRET=p9Y!2m@lK8z$1WqA7&dE4Xu0Cj`

## Running Locally

To run the application locally:

1. **Navigate to Project Directory (from Root)**:
```bash
   cd frontend
   ```

2. **Start the development server**:
```bash
   npm run dev
   ```

3. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

4. **Login credentials**:
   For testing purposes, you can use the following credentials:
   - Username: `admin`
   - Password: `admin123`

   or

   - Username: `sunny.admin`
   - Password: `sunny.admin123`
   
   Or register a new account through the registration page.

</details>
