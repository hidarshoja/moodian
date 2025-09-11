import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import Password from "./pages/Password";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/login/page";
import Register from "./pages/Rigester/Register";

export const route = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <DashboardPage />
            },
            {
                path: '/profile',
                element: <ProfilePage />
            },
          
            {
                path: '/password',
                element: <Password />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }


])