# SecureBank Application

## Overview

SecureBank is a comprehensive banking application simulation designed for educational purposes, particularly focusing on web security and SQL injection vulnerabilities. This application provides a realistic banking interface with features such as account management, transaction tracking, feedback system, and a detailed Help & FAQ section.

>**IMPORTANT NOTE**: This application contains intentional security vulnerabilities as part of a Capture The Flag (CTF) exercise focused on SQL injection. These vulnerabilities are for educational purposes only and should not be implemented in production environments.


## Table of Contents

- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [API and Backend](#api-and-backend)
- [Database Structure](#database-structure)
- [Security Vulnerabilities](#security-vulnerabilities)
- [Pages and Components](#pages-and-components)
- [Technologies Used](#technologies-used)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

SecureBank offers a comprehensive set of features designed to simulate a real banking application:

### Account Management
- User authentication (login/logout)
- Account registration
- Profile management
- Session tracking (last login time)

### Transaction System
- View transaction history
- Add new transactions (credit/debit)
- Search and filter transactions
- Transaction categorization

### Feedback System
- Submit feedback on the application
- View feedback from other users
- Feedback history tracking

### Help & FAQ Center
- Comprehensive FAQ section organized by categories
- Searchable FAQ database
- Quick tips and security recommendations
- Additional help resources

### Security Features (and Intentional Vulnerabilities)
- Password protection
- Session management with signed cookies
- Secure routing
- Intentional SQL injection vulnerabilities for educational purposes

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
   
   Or register a new account through the registration page.


## Project Structure

```
frontend/
├── app/                            # Next.js App Router directory
│   ├── api/                        # API routes for backend functionality
│   │   ├── feedback/               # Feedback API endpoints
│   │   │   └── route.ts
│   │   ├── get-session/            # Session management endpoints
│   │   │   └── route.ts
│   │   ├── login/                  # Authentication endpoints
│   │   │   └── route.ts
│   │   ├── logout/                 # Logout functionality
│   │   │   └── route.ts
│   │   ├── register/               # User registration
│   │   │   └── route.ts
│   │   └── transactions/           # Transaction management
│   │       └── route.ts
│   ├── dashboard/                  # Dashboard pages
│   │   ├── feedback/               # Feedback system
│   │   │   └── page.tsx
│   │   ├── transactions/           # Transaction management
│   │   │   ├── add/
│   │   │   │   └── page.tsx        # Add transaction form
│   │   │   └── page.tsx            # Transaction list
│   │   └── page.tsx                # Main dashboard
│   ├── help-faq/                   # Help & FAQ section
│   │   └── page.tsx
│   ├── login/                      # Login page
│   │   └── page.tsx
│   ├── public/                     # Public discussions page
│   │   └── discussions/
│   │       └── page.tsx
│   ├── register/                   # Registration page
│   │   └── page.tsx
│   ├── globals.css                 # Global CSS styles
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Landing page
├── components/                     # Shared components (not shown in file structure)
│   ├── ui/                         # UI components
│   └── ...
├── database/                       # Database configuration and setup
│   └── db.ts                       # SQLite database initialization
├── lib/                            # Utility functions and libraries
│   └── utils.ts
├── public/                         # Static assets
│   ├── digital-flow.png
│   ├── interconnected-banking.png
│   └── secure-future-hands.png
├── .env.local                      # Environment variables
├── .eslintrc.json                  # ESLint configuration
├── .gitignore                      # Git ignore file
├── database.sqlite                 # SQLite database file
├── next.config.mjs                 # Next.js configuration
├── package.json                    # Project dependencies
├── README.md                       # Project documentation
├── tailwind.config.ts              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
└── Dockerfile                      # Build structset
└── .dockerignore                   # Docker ignore file (node_modules, etc.)
└── start.sh                        # Start script for Docker
```

## API and Backend

The application uses Next.js App Router API routes to handle backend functionality. Each API endpoint is implemented as a route handler in the `app/api` directory.

### API Structure

- **`/api/feedback`**: Manages user feedback submissions and retrieval
- **`/api/get-session`**: Handles session management and user information retrieval
- **`/api/login`**: Authenticates users and creates secure sessions
- **`/api/logout`**: Terminates user sessions
- **`/api/register`**: Handles new user registration
- **`/api/transactions`**: Manages transaction creation and retrieval

### Authentication Flow

The application uses signed cookies for secure authentication:

1. User submits login credentials
2. Server validates credentials against the database
3. On successful authentication, a signed session cookie is created using cookie-signature
4. Session information includes username and role
5. Protected routes verify the session cookie before granting access

Example from the login route handler:

```typescript
// Create signed session cookie
const sessionData = JSON.stringify({ username: decodedUsername, role: user.role });
const secret = process.env.COOKIE_SECRET!;
const signedSession = cookieSignature.sign(sessionData, secret);

// Set the cookie
(await cookies()).set("session", signedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 1-day expiration
    path: "/",
});
```

## Database Structure

The application uses SQLite with better-sqlite3 for data storage. The database schema is defined in `database/db.ts`:

### Tables

1. **Users**
```sql
   CREATE TABLE IF NOT EXISTS Users (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     username VARCHAR(1000) UNIQUE,
     password VARCHAR(1000),
     role VARCHAR(1000)
   );
```

2. **Transactions**
```sql
   CREATE TABLE IF NOT EXISTS Transactions (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     sender VARCHAR(1000), 
     recipient VARCHAR(1000),  
     amount INTEGER
   );
```

3. **Feedback**
```sql
   CREATE TABLE IF NOT EXISTS feedback (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     user TEXT NOT NULL,
     message TEXT NOT NULL,
     date TEXT DEFAULT CURRENT_TIMESTAMP,
     read BOOLEAN DEFAULT 0
   );
```

### Database Initialization

The database is initialized with a default admin user if one doesn't exist:

```typescript
// Inserts a hardcoded admin user if none exists
const adminExists = db.prepare("SELECT * FROM Users WHERE username = 'admin'").get();

if (!adminExists) {
  db.prepare("INSERT INTO Users (username, password, role) VALUES (?, ?, ?)").run(
    "admin",
    "admin123",
    "admin"
  );
  console.log("Admin user created: admin / admin123");
} else {
  console.log("Admin user already exists.");
}
```

### Main Pages

1. **Landing Page** (`/`):
   - Introduction to SecureBank
   - Login and registration links
   - Animated background using Vanta.js

2. **Login Page** (`/login`):
   - User authentication form
   - Error handling for invalid credentials
   - Link to registration page

3. **Registration Page** (`/register`):
   - New user registration form
   - Password confirmation
   - Form validation

4. **Dashboard** (`/dashboard`):
   - Account overview
   - Recent transactions
   - Financial statistics
   - Quick links to other sections

5. **Transactions** (`/dashboard/transactions`):
   - Transaction history table
   - Search and filter functionality
   - Transaction summary cards

6. **Add Transaction** (`/dashboard/transactions/new`):
   - Form to add new transactions
   - Date picker
   - Transaction type selection

7. **Feedback** (`/dashboard/feedback`):
   - Feedback submission form
   - Feedback history
   - Statistics on feedback

8. **Help & FAQ** (`/help-faq`):
   - Categorized FAQ sections
   - Search functionality (vulnerable to SQL injection)
   - Contact information

### Key Components

1. **Navigation Bar**:
   - Present on all authenticated pages
   - Links to main sections
   - Logout button

2. **Transaction Cards**:
   - Display transaction information
   - Color-coded by transaction type

3. **FAQ Accordion**:
   - Expandable FAQ items
   - Category filtering

4. **Search Components**:
   - Present in transactions and FAQ pages
   - Vulnerable to SQL injection (intentionally)

5. **Form Components**:
   - Login, registration, transaction, and feedback forms
   - Input validation

## Technologies Used

### Frontend
- **Next.js**: React framework for server-rendered applications
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vanta.js**: 3D animated backgrounds on login screen.

### Backend
- **Next.js API Routes**: Server-side API endpoints
- **better-sqlite3**: SQLite database driver for Node.js
- **cookie-signature**: For signing and verifying cookies
- **next/headers**: For cookie management in route handlers

### Development Tools
- **ESLint**: JavaScript linting utility
- **Prettier**: Code formatter
- **Git**: Version control system

## Development Workflow

### Code Organization

- **Pages**: Located in the `app` directory following Next.js App Router conventions
- **API Routes**: Server-side endpoints in the `app/api` directory
- **Components**: Reusable UI elements in the `components` directory
- **Database**: SQLite setup and schema in the `database` directory
- **Styles**: Tailwind CSS utility classes with global styles in `globals.css`
- **Utils**: Helper functions in the `lib` directory

### Adding New Features

1. Create new components in the `components` directory
2. Add new pages in the appropriate directories under `app`
3. Implement API endpoints in the `app/api` directory
4. Update database schema if necessary at `database/db.ts`
5. Test the feature locally
6. Commit changes with descriptive commit messages

### Best Practices

- Follow TypeScript type definitions
- Use React hooks for state management
- Implement responsive design using Tailwind's responsive utilities
- Keep components small and focused on a single responsibility
- Use semantic HTML elements
- Properly sanitize user inputs in production code (intentionally not done in some places for CTF)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Disclaimer

This application contains intentional security vulnerabilities for educational purposes. Do not use this code in production environments without addressing these vulnerabilities. The creators of this application are not responsible for any misuse or damage caused by the code.

---

*Last updated: April 15, 2025*

*Created for educational purposes only for CSCI3540U - Ontario Tech - CTF Final Major Project.*
