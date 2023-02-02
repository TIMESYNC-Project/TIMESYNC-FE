import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginPage from "pages/auth/Login";
import HomePage from "pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const index = () => {
  return <RouterProvider router={router} />;
};

export default index;
