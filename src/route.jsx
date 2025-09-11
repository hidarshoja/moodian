import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/login/page";
import Register from "./pages/Rigester/Register";
import ServicesPage from "./pages/ServicesPage";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import ReportsPage from "./pages/ReportsPage";
import AnalyticalReportsPage from "./pages/AnalyticalReportsPage";
import ContradictionPage from "./pages/ContradictionPage";
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
                path: '/services',
                element: <ServicesPage />
            },
            {
                path: '/customers',
                element: <CustomersPage />
            },
            {
                path: '/invoices',
                element: <InvoicesPage />
            },
            {
                path: '/reports',
                element: <ReportsPage />
            },
            {
                path: '/analyticalReports',
                element: <AnalyticalReportsPage />
            },
            {
                path: '/contradiction',
                element: <ContradictionPage />
            },
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