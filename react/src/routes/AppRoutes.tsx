import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import RegisterPage from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPasswordPage from "../pages/ResetPassword";
import ProfilePage from "../pages/Profile";
import FolderPage from "../pages/FolderPage";
import NotificationPage from "../pages/NotificationPage";
import NotFoundPage from "../pages/NotFound";
import AppShell from "../layouts/MainLayout";
import GlobalError from "../pages/GlobalError";
import RootLayout from "../layouts/RootLayout";
import { authLoader } from "../components/loaders/authLoader";
import { protectedLoader } from "../components/loaders/protectedLoader";
import { publicLoader } from "../components/loaders/publicLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: authLoader,
    errorElement: <GlobalError />,
    children: [
      {
        loader: publicLoader,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <RegisterPage /> },
          { path: "/forgot-password", element: <ForgotPassword /> },
          { path: "/reset-password/:token", element: <ResetPasswordPage /> },
        ],
      },
      {
        element: <AppShell />,
        loader: protectedLoader,
        children: [
          { path: "/folders/:folderId", element: <FolderPage /> },
          { path: "/notifications", element: <NotificationPage /> },
          { path: "/profile", element: <ProfilePage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
