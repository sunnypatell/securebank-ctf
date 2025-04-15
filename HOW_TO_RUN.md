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
