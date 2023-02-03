import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "pages/auth/Login";
import EmployeeProfile from "pages/EmployeeProfile";
import CompanyProfile from "pages/CompanyProfile";
import Employee from "pages/Employee";
import Records from "pages/Records";
import HomePage from "pages/Home";
import RecordsDetail from "pages/RecordsDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/employeeprofile",
    element: <EmployeeProfile />,
  },
  {
    path: "/companyprofile",
    element: <CompanyProfile />,
  },
  {
    path: "/employee",
    element: <Employee />,
  },
  {
    path: "/records",
    element: <Records />,
  },
  {
    path: "/records/details/:id",
    element: <RecordsDetail />,
  },
]);

const index = () => {
  return <RouterProvider router={router} />;
};

export default index;
