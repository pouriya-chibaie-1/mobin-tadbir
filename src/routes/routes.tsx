import {
  createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import Task from "../pages/Task2";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [{
        path: "/",
        element: <Home />

      },{
        path:"/task2",
        element: <Task />
      }],
    },
  ]);

  export default router;