import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "../Constants/Routes";
import DashboardLayout from "../Layout";

import { PageRoutes } from "./PageRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../Pages/auth/Login";
import ForgotPassword from "../Pages/auth/ForgotPassword";

export const Router = createBrowserRouter([
  { path: ROUTES.AUTH.LOGIN,element: <Login /> },
  { path: ROUTES.AUTH.FORGOT_PASSWORD,element: <ForgotPassword /> },


  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <DashboardLayout />,
        children: PageRoutes,
      },
    ],
  },
]);