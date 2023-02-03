import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "pages/auth/Login";
import EmployeeProfile from "pages/EmployeeProfile";
// import CompanyProfile from "pages/CompanyProfile";
import HomePage from "pages/Home";

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
  // {
  //   path: "/companyprofile",
  //   element: <CompanyProfile />,
  // },
]);

const index = () => {
  return <RouterProvider router={router} />;
};

export default index;
