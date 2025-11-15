<div align="center">
  <h1>Contributing to SecureBank</h1>
  <p><i>Help us build a world‑class, intentionally vulnerable CTF app.</i></p>
  <img alt="PRs" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"> <img alt="Style" src="https://img.shields.io/badge/TypeScript-required-3178c6?logo=typescript&logoColor=white"> <img alt="Next" src="https://img.shields.io/badge/Next.js-15-black?logo=next.js">
</div>

---

## Contribution Guidelines (Quick Version)

- Use TypeScript everywhere; keep components small and readable
- Prefer Tailwind CSS; no heavy UI libs
- Keep vulnerabilities intentional and scoped to challenges
- Discuss large changes in an issue before coding
- Write clear commit messages and focused PRs

### Branch Naming
- `feat/<area>-<short-desc>` (e.g., `feat/faq-sqli-challenge`)
- `fix/<area>-<bug>` (e.g., `fix/login-error-message`)
- `docs/<what>` (e.g., `docs/update-readme-docker`)

### Conventional Commits (recommended)
- `feat: add SQLi challenge to transaction search`
- `fix: correct session validation bug in login route`
- `docs: expand Docker usage section`

### PR Checklist
- Includes scope, motivation, and testing steps
- Notes whether a change is an intentional vulnerability
- Screenshots for UI changes
- Lint passes locally (`npm run lint`)

### Local Dev Checks
```bash
cd frontend
npm ci
npm run lint
npm run dev
```

### Issue Labels (suggested)
- `challenge`, `bug`, `docs`, `enhancement`, `security`, `good first issue`

---

# Contributing to SecureBank

Thanks for your interest in contributing to SecureBank! This project is intentionally designed for web security education and CTF-style exploitation, especially focused on SQL injection. All contributions that maintain the educational value and spirit of the project are welcome.

---

## 🧠 What This Project Is

SecureBank is a full-stack, intentionally vulnerable banking simulation built with:

- Next.js 15 (App Router)
- React 18 with TypeScript
- Tailwind CSS
- SQLite with raw SQL (no ORM)
- cookie-signature for session validation

---

## 🛠️ Local Development Setup

1. Clone the repository:

```bash
   git clone https://github.com/sunnypatell/securebank-ctf.git
```

   ```bash
   cd securebank-ctf/frontend
```

2. Install dependencies:

```bash
   npm ci
```

4. Run the development server:

```bash
   npm run dev
```
   
5. Visit:

   `http://localhost:3000`

6. Log in using:

   Username: `admin`
   Password: `admin123`

---

## 💡 What You Can Contribute

- New CTF challenges (SQLi, IDOR, XSS, logic flaws)
- More vulnerable search fields or filters
- New hints or hidden challenge metadata
- Frontend improvements (TSX components, toasts, layout fixes)
- Backend extensions (custom endpoints, deeper session logic)
- Bug fixes or accessibility tweaks

---

## 🧪 Adding Challenges

If you’re adding a new vulnerable route or CTF objective:

1. Write the vulnerable backend logic (e.g., SQL without sanitization)
2. Keep it realistic (e.g., abuse filters, metadata, user input)
3. Add a file under `/challenges/` with:
   - Challenge title
   - Intended vulnerability
   - Payload example
   - Solution or goal
4. Document any user roles required to trigger it

If the vulnerability is intentional, include this comment near the logic:

   // Intentionally vulnerable — do not sanitize

---

## 🔍 Coding Guidelines

- TypeScript required for all components and APIs
- Tailwind CSS only (no external UI libraries)
- TSX components go in `/components/`
- Keep logic modular and readable
- Prettier and ESLint are already configured — please run before pushing

---

## ✅ Commit Message Format

Use clear, scoped messages:

   feat: add SQLi challenge to transaction search
   fix: correct session validation bug in login route

---

## 🚨 Security Expectations

This project is **not** meant to be secure. Do not "fix" deliberately vulnerable code unless marked otherwise. Secure routes (e.g., login) may have sanitization, but most user-input routes are left open for exploitability.

If a PR makes the app more secure, be sure it’s aligned with the challenge logic and doesn't break an intended CTF vector.

---

## 🔁 Submitting Pull Requests

1. Fork the repo
2. Create a branch (e.g., `add/faq-sqli-challenge`)
3. Push your changes
4. Open a pull request to `main`
5. Include:
   - What you changed
   - What CTF goal or vulnerability it demonstrates
   - How it fits into the existing user flow

---

## 🙋 Questions?

Open an issue or start a GitHub discussion. We’re always open to new CTF-style ideas.

---

Thanks for helping us make SecureBank even better — and more dangerously educational 🔐🚩
