# React Frontend - Advanced Authentication System

A modern **React + TypeScript** frontend application built with **Vite**, **Redux Toolkit**, and **Ant Design**. This frontend integrates with a MERN backend to provide a complete authentication & authorization system with a polished, responsive UI.

---

## ✨ Features

### Authentication & Security

* **JWT Authentication**: Secure token-based authentication with automatic token refresh
* **Silent Refresh**: Transparent token refresh using Axios Interceptors (no manual re-login needed)
* **HttpOnly Cookie Support**: Secure refresh token storage via server-side cookies
* **Route Protection**:
  * **Protected Routes**: Automatic redirection of unauthenticated users to login
  * **Public Routes**: Smart redirection of authenticated users away from auth pages
* **State Persistence**: Redux state persists across page reloads using Redux middleware

### User Interface

* **Modern Design**: Built with Ant Design 6.x and Tailwind CSS 4.x
* **Responsive Layout**: Mobile-first, fully responsive across all devices
* **Global Error Handling**: Centralized error handling via Axios interceptors with toast notifications
* **Loading States**: Smooth loading indicators and state management

### Functionality

* **User Management**: Register, Login, Logout operations
* **Profile Management**: View and manage user information
* **Password Recovery**: Secure forgot password flow with email verification
* **Real-time Feedback**: Toast notifications and form validation
* **Push Notifications**: Schedule and deliver web push notifications to users with browser integration

---

## 🛠️ Tech Stack

### Frontend

* **React 19** + **TypeScript** - UI library with type safety
* **Vite 7** - Lightning-fast build tool and dev server
* **Redux Toolkit** - Predictable state management
* **Axios** - HTTP client with built-in interceptors
* **Ant Design 6** - Enterprise UI component library
* **Tailwind CSS 4** - Utility-first CSS framework
* **React Router DOM 7** - Client-side routing
* **Day.js** - Lightweight date/time library
* **React Select** - Flexible select component
* **Web Push API** - Browser-native push notifications support

### Backend (Connected to)

* Node.js + Express
* MongoDB + Mongoose
* JWT Authentication
* Cookie-Parser
* Bcryptjs - Password hashing
* Nodemailer - Email service (Gmail SMTP)

---

## 📋 Getting Started

### Prerequisites

* **Node.js** v18+ 
* **npm** or **yarn** package manager
* Backend API running (see backend README for setup)

### Installation

1. **Clone the repository** (if not already cloned):

```bash
git clone <repository-url>
cd tasks-frontend/react
```

2. **Install dependencies**:

```bash
npm install
```

3. **Create environment file** - Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
```

> Update `VITE_API_URL` to match your backend server's API endpoint.

### Running the Application

**Development Server** (with hot module replacement):

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

**Build for Production**:

```bash
npm run build
```

**Preview Production Build**:

```bash
npm run preview
```

**Lint Code**:

```bash
npm run lint
```

---

## 📂 Project Structure

```plaintext
src/
├── App.tsx                     # Main app component with routing
├── AppInitializer.tsx          # Auth state initialization on app load
├── index.css                   # Global styles
├── main.tsx                    # Entry point
│
├── app/                        # Redux store configuration
│   ├── store.ts                # Redux store setup
│   └── hooks.ts                # Custom Redux hooks
│
├── assets/                     # Static assets (images, icons, fonts)
│
├── components/                 # Reusable UI components
│   ├── AuthLayout.tsx          # Wrapper for auth pages
│   ├── AppNavbar.tsx           # Main navigation bar
│   └── ...                     # Other shared components
│
├── features/                   # Redux slices & API logic
│   ├── auth/                   # Authentication feature
│   │   ├── authSlice.ts        # Redux slice with actions/reducers
│   │   ├── authTypes.ts        # TypeScript interfaces
│   │   └── authAPI.ts          # API calls for auth
│   └── ...                     # Other features
│
├── layouts/                    # Layout components
│   ├── AppLayout.tsx           # Main app layout with sidebar
│   └── ...
│
├── pages/                      # Page-level components
│   ├── Dashboard.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── ...
│
├── routes/                     # Routing configuration
│   ├── ProtectedRoute.tsx      # Route guard for authenticated users
│   ├── PublicRoute.tsx         # Route guard for public pages
│   └── AppRoutes.tsx           # Central route configuration
│
├── services/                   # API and utility services
│   ├── axiosInstance.ts        # Axios configuration with interceptors
│   └── ...
│
├── types/                      # Shared TypeScript types
│   └── index.ts                # Type definitions
│
└── utils/                      # Utility functions
    ├── helpers.ts              # Helper functions
    ├── notification.ts         # Notification utility functions
    └── ...
```

---

## � Push Notifications

### Feature Overview

The application includes a comprehensive **Web Push Notification** system that allows users to:

* **Enable Notifications**: Subscribe to push notifications with one click
* **Schedule Campaigns**: Schedule notifications to be delivered at a specific date and time
* **Custom Messages**: Create personalized notification titles and message bodies
* **Persistent Storage**: Subscriptions are stored server-side and persisted across sessions

### How It Works

1. **Service Worker Integration**: Uses the browser's Service Worker API for background notification handling
2. **VAPID Keys**: Web Push protocol with public/private VAPID key pairs for secure communication
3. **Subscription Management**: Server maintains subscription details for scheduled delivery
4. **Time-based Scheduling**: Notifications are delivered at the exact time specified by the user

### Usage

1. Navigate to **`/notifications`** route
2. Click **"Enable Browser Notifications"** to grant permission and subscribe
3. Fill in notification details:
   - **Title**: Notification heading
   - **Message Body**: Main notification content
   - **Delivery Time**: Date and time to send the notification
4. Click **"Schedule Campaign"** to schedule the notification

### Environment Setup

Add the VAPID public key to your `.env` file:

```env
VITE_VAPID_PUBLIC_KEY=your_vapid_public_key_here
```

> VAPID keys are generated on the backend. See backend documentation for setup.

### Technical Details

* **API Endpoints**:
  * `POST /api/notifications/subscribe` - Register device subscription
  * `POST /api/notifications/schedule` - Schedule a notification

* **Browser Support**: 
  * Requires browsers with Service Worker support (modern Chrome, Firefox, Edge, etc.)
  * Works across desktop and mobile devices

---

## �🔐 Security Features

### Implemented Security Measures

* **HttpOnly Cookies**: Refresh tokens stored server-side, preventing XSS attacks
* **CORS Protection**: Backend validates origin and credentials
* **Automatic Token Refresh**: Silent token rotation via interceptors
* **Protected Routes**: Server-side validation of user credentials
* **Input Validation**: Client-side form validation before submission
* **Password Hashing**: Server-side bcryptjs for secure password storage

### Best Practices

* Never store sensitive tokens in LocalStorage
* Always use HTTPS in production
* Keep backend secrets secure in environment variables
* Regularly rotate JWT secrets
* Implement rate limiting on login attempts (backend)

---

## 🔗 API Integration

### Axios Interceptors

The application uses Axios interceptors for:

* **Request Interceptor**: Adds authorization headers to all requests
* **Response Interceptor**: Handles token refresh automatically on 401 responses
* **Error Handling**: Catches and displays errors globally

### Supported Endpoints (Backend)

```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/logout            # User logout
POST   /api/auth/refresh           # Refresh tokens
GET    /api/auth/me                # Get current user
POST   /api/auth/forgot-password   # Request password reset
POST   /api/auth/reset-password    # Reset password with token
```

---

## 🚀 Deployment

### Build Optimization

The production build includes:

* Code minification
* Tree-shaking unused code
* Asset optimization
* Chunk splitting for better caching

### Deployment Steps

1. Build the application:
   ```bash
   npm run build
   ```

2. The `dist/` folder contains the production build

3. Deploy to your hosting service:
   - **Vercel**: Connect repository, auto-deploys on push
   - **Netlify**: Connect repository with `dist/` as build output
   - **GitHub Pages**: Use `dist/` folder as static site
   - **Self-hosted**: Serve `dist/` with any static server (nginx, apache, etc.)

4. Update `VITE_API_URL` environment variable to production backend URL

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **CORS errors** | Ensure backend CORS is configured to allow frontend origin |
| **401 Unauthorized** | Check if refresh token is valid; re-login if needed |
| **Blank page after build** | Verify API URL in `.env` file matches backend |
| **Styles not loading** | Ensure Tailwind CSS is properly configured; rebuild project |
| **Network errors** | Check if backend server is running and API URL is correct |

---

## 📖 Additional Resources

* [React Documentation](https://react.dev)
* [Vite Guide](https://vitejs.dev/guide/)
* [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
* [Ant Design Components](https://ant.design/components/overview/)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [Axios Documentation](https://axios-http.com/)

---

## 📝 License

This project is distributed under the **MIT License**. See the `LICENSE` file for more information.
