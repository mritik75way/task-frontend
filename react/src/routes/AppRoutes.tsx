import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoutes";
import Login from "../pages/Login";
import RegisterPage from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ProfilePage from "../pages/Profile";
import NotFoundPage from "../pages/NotFound";
import ResetPasswordPage from "../pages/ResetPassword";
import FolderPage from "../pages/FolderPage";
import AppShell from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/folders/:folderId" element={<FolderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;