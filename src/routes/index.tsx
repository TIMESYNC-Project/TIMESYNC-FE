import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RequestApproval from "pages/RequestApproval";
import EmployeeProfile from "pages/EmployeeProfile";
import CompanyProfile from "pages/CompanyProfile";
import RecordsDetail from "pages/RecordsDetail";
import Employee from "pages/Employee";
import Approval from "pages/Approval";
import Settings from "pages/Settings";
import Login from "pages/auth/Login";
import Records from "pages/Records";
import Inbox from "pages/Inbox";
import Home from "pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
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
  {
    path: "/approval",
    element: <Approval />,
  },
  { 
    path: "/approval/request",
    element: <RequestApproval />,
  },
  { 
    path: "/inbox",
    element: <Inbox />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

const index = () => {
  return <RouterProvider router={router} />;
};

export default index;
