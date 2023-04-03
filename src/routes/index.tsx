import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

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

// axios.defaults.baseURL = "https://shirayuki.site/";

axios.defaults.baseURL =
  "https://virtserver.swaggerhub.com/fauzilax/TIMESYNC/1.0.0";

// axios.defaults.baseURL =
//   "https://virtserver.swaggerhub.com/ALIFMUHAMADHAFIDZ23/TimeSync/1.0.0";

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
    path: "/profile",
    element: <EmployeeProfile />,
  },
  {
    path: "/employee/profile/:id",
    element: <EmployeeProfile />,
  },
  {
    path: "/profile/company",
    element: <CompanyProfile />,
  },
  {
    path: "/employees",
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
