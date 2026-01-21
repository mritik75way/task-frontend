#  MERN Advanced Authentication System

A **production-grade Authentication & Authorization system** built with the **MERN stack** (MongoDB, Express, React, Node.js). It features a **Silent Refresh mechanism**, **HttpOnly Cookies** for enhanced security, and a polished UI using **Ant Design** and **Tailwind CSS**.

---

##  Features

### Authentication & Security

* **JWT Authentication**: Secure Access & Refresh token rotation
* **Silent Refresh**: Automatically refreshes tokens in the background using Axios Interceptors (no random logouts)
* **HttpOnly Cookies**: Refresh tokens are stored in secure cookies, preventing XSS attacks
* **Route Protection**:

  * **Protected Routes**: Redirect unauthenticated users to Login
  * **Public Routes**: Redirect logged-in users away from Login/Register pages to the Dashboard
* **State Persistence**: Redux state re-hydration on page reload (user stays logged in)

### User Interface

* **Modern UI**: Built with Ant Design 5.0 and Tailwind CSS
* **Responsive Layouts**: Mobile-friendly Navbar and Dashboard
* **Global Feedback**: Centralized error handling using Axios interceptors and AntD message toasts
* **Loading States**: Polished loading spinners preventing FOUC (Flash of Unstyled Content)

###  Functionality

* **User Management**: Register, Login, Logout (server-side cookie clearing)
* **Profile Management**: View user details (Name, Email, Avatar)
* **Password Recovery**: Secure *Forgot Password* flow using Email (Nodemailer) and unique reset tokens

---

## 🛠️ Tech Stack

### Frontend

* React (Vite) + TypeScript
* Redux Toolkit (State Management)
* Axios (API Requests & Interceptors)
* Ant Design + Tailwind CSS (Styling)
* React Router DOM (Routing)

### Backend

* Node.js + Express
* MongoDB + Mongoose
* JsonWebToken (JWT)
* Cookie-Parser
* Nodemailer (Gmail SMTP)
* Bcryptjs (Password Hashing)

---

##  Installation & Setup

###  Prerequisites

* Node.js (v16+)
* MongoDB (Local or Atlas)

---

###  Backend Setup

Navigate to the server folder:

```bash
cd server
npm install
```

Create a `.env` file in the **server root**:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth-db
FRONTEND_URL=http://localhost:5173

# Security Secrets (Use random long strings)
JWT_ACCESS_SECRET=your_super_secret_access_key
JWT_REFRESH_SECRET=your_super_secret_refresh_key

# Email Service (Google App Password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-google-app-password
```

Run the server:

```bash
npm run dev
```

---

###  Frontend Setup

Navigate to the client folder:

```bash
cd client
npm install
```

Create a `.env` file in the **client root**:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

---

## 📂 Project Structure

### Frontend (`/client`)

```plaintext
src/
├── app/                  # Redux store configuration
├── assets/               # Static images/icons
├── components/           # Reusable components
│   ├── AuthLayout.tsx    # Wrapper for Login/Register pages
│   └── AppNavbar.tsx     # Responsive Navigation
├── features/             # Redux Slices & API Logic
│   └── auth/             # Auth slice, async thunks, types
├── layouts/              # Main app layouts (Sidebar, etc.)
├── pages/                # Page components
│   ├── Dashboard.tsx
│   ├── LoginPage.tsx
│   └── ...
├── routes/               # Routing Logic
│   ├── ProtectedRoute.tsx
│   └── PublicRoute.tsx
├── services/             # Axios instance & Interceptors
└── App.tsx               # Main Entry with Auth Initializer
```


## 📧 How to Setup Email (Gmail)

To make the **Forgot Password** feature work, you cannot use your regular Gmail password.

1. Go to **Google Account → Security**
2. Enable **2-Step Verification**
3. Search for **App Passwords**
4. Create a new app (name it `Auth App`) and copy the **16-digit code**
5. Paste this code into `EMAIL_PASS` in your backend `.env` file

---

##  Security Best Practices Implemented

* **HttpOnly Cookies**: Refresh tokens are not stored in LocalStorage, protecting against XSS attacks
* **Token Rotation** *(Optional/Recommended)*: New refresh tokens are issued every time the old one is used
* **Strict CORS**: Backend only accepts credentialed requests from the configured frontend URL

---

##  Contributing

1. Fork the repository
2. Create your feature branch:

   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push to the branch:

   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
