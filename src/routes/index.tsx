import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "pages/auth/Login";
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
]);

const index = () => {
  return <RouterProvider router={router} />;
};

export default index;
