import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "./components/Register";
import App from "./App";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Students from "./components/Students";
import Rooms from "./components/Rooms";
import Complaints from "./components/Complaints";
import Staff from "./components/Staff";
import Home from "./components/Home";
import Fees from "./components/Fees";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/app",
    element: <App />,
    errorElement: <div>Oops! Something went wrong.</div>, // Optional: for error handling,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "complaints",
        element: <Complaints />,
      },
      {
        path: "staff",
        element: <Staff />,
      },
      {
        path: "fees",
        element: <Fees />,
      },
      {
        path: "complaints",
        element: <Complaints />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
