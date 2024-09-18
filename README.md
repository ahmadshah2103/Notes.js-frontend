# Notes.js Frontend

This project is the frontend for the Notes.js API, built with React and Vite. It an interface for managing notes with JWT-based user authentication.

## Getting Started

### Prerequisites

-   Node.js (version 14 or later)
-   npm (comes with Node.js)

### Installation

1. Clone the repository:

    ```
    git clone https://github.com/ahmadshah2103/Notes.js-frontend
    cd Notes.js-frontend
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Clone and Setup the Backend:
    ```
    git clone https://github.com/ahmadshah2103/Notes.js
    cd Notes.js
    npm install
    npm run dev
    ```

### Running the Application

To start the development server:

```
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Available Scripts

```6:11:package.json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
```

-   `npm run dev`: Starts the development server
-   `npm run build`: Builds the app for production
-   `npm run lint`: Runs ESLint to check code quality
-   `npm run preview`: Previews the built app locally

## Project Structure
```
.
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
├── src
│   ├── App.jsx
│   ├── assets
│   ├── components
│   │   ├── Auth
│   │   │   ├── Profile.jsx
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── index.js
│   │   ├── Common
│   │   │   └── Navbar.jsx
│   │   └── Notes
│   │       ├── NoteCard.jsx
│   │       ├── NoteForm.jsx
│   │       └── NoteList.jsx
│   ├── containers
│   │   ├── AuthPage.jsx
│   │   ├── CreateOrUpdateNotePage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── ProfilePage.jsx
│   ├── contexts
│   │   └── AuthContext.jsx
│   ├── hooks
│   ├── layouts
│   ├── main.jsx
│   ├── routes
│   ├── services
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── noteService.js
│   └── utils
└── vite.config.js
```

## Authentication

This project uses JWT-based authentication. The `AuthContext` provides authentication state and methods throughout the application.

## API Integration

The `api.js` file sets up an Axios instance for making API calls. It automatically includes the JWT token in the request headers for authenticated requests.
