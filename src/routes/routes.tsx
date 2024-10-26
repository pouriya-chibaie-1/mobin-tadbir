import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Test from "../pages/test";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [{
        path: "/",
        element: <Test />

      }],
    },
  ]);

  export default router;