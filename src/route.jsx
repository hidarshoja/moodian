import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/login/page";
import Register from "./pages/Rigester/RegisterPage";
import ServicesPage from "./pages/ServicesPage";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import ReportsPage from "./pages/ReportsPage";
import AnalyticalReportsPage from "./pages/AnalyticalReportsPage";
import ContradictionPage from "./pages/ContradictionPage";
import ContractsPage from "./pages/ContractsPage";
import ShoppingPage from "./pages/ShoppingPage";
import ReviewPage from "./pages/ReviewPage";
import BillPage from "./pages/BillPage";
import ConnectionsPage from "./pages/ConnectionsPage";
import CancelPage from "./pages/CancelPage";
import ChangeStatus from "./pages/ChangeStatus";
import PasswordPage from "./pages/PasswordPage";
import SupportPage from "./pages/SupportPage";
import OtpPage from "./pages/login/OtpPage";
import DownloadExcel from "./pages/DownloadExcel";
import CreateToken from "./pages/CreateToken";

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
            {
                path: '/contracts',
                element: <ContractsPage />
            },
            {
                path: '/shopping',
                element: <ShoppingPage />
            },
            {
                path: '/review',
                element: <ReviewPage />
            },
            {
                path: '/billBank',
                element: <BillPage />
            },
            {
                path: '/connections',
                element: <ConnectionsPage />
            },
            {
                path: '/cancel',
                element: <CancelPage />
            },
            {
                path: '/change-status',
                element: <ChangeStatus />
            },
            {
                path: '/change-password',
                element: <PasswordPage />
            },
            {
                path: '/support',
                element: <SupportPage />
            },
            {
                path: '/downloadExcel',
                element: <DownloadExcel />
            },
            {
                path: '/create-token',
                element: <CreateToken />
            },
        ]
    },
    // ConnectionsPage
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
            ,
            {
                path: 'otp',
                Component: OtpPage
            }
        ]
    }


])