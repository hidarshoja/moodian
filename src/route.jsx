import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Password from "./pages/Password";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/login/page";
import Register from "./pages/Rigester/Register";
import ConditionPage from "./pages/ConditionPage";
import VolumePage from "./pages/VolumePage";
import DataPage from "./pages/DataPage";
import ChartPage from "./pages/ChartPage";
import NewBoxPage from "./pages/NewBoxPage";
import AddressPage from "./pages/AddressPage";
import CreatePage from "./pages/CreatePage";


export const route = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <ConditionPage />
            },
            {
                path: '/volume',
                element: <VolumePage />
            },
            {
                path: '/data',
                element: <DataPage />
            },
            {
                path: '/chart',
                element: <ChartPage />
            },
            {
                path: '/new-box',
                element: <NewBoxPage />
            },
            {
                path: '/address',
                element: <AddressPage />
            },
            {
                path: '/create',
                element: <CreatePage />
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