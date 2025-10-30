import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./Protected";
import Login from "../LoginComp/Login";
import ULogin from "../LoginComp/ULogin";
import ALogin from "../LoginComp/ALogin";
import Signup from "../LoginComp/Signup";
import HelpDesk from "../DashComp/HelpDesk";
import User from "../NavBar/User";
import Statistics from "../NavBar/Statistics";
import Dashboard from "../NavBar/Dashboard";
import Mark from "../DashComp/Mark";
import Notice from "../DashComp/Notice";
import Attendcal from "../DashComp/Attendcal";
import Landing from "../Landing";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" /> },
  { path: "/login", element: <Login /> },
  { path: "/landing", element: <Landing /> },
  { path: "/ulogin", element: <ULogin /> },
  { path: "/alogin", element: <ALogin /> },
  { path: "/signup", element: <Signup /> },

  { path: "/dashboard", element: <Dashboard /> },
  { path: "/mark", element: <ProtectedRoute><Mark /></ProtectedRoute> },
  { path: "/notice", element: <ProtectedRoute><Notice /></ProtectedRoute> },
  { path: "/helpdesk", element: <ProtectedRoute><HelpDesk /></ProtectedRoute> },
  { path: "/attendcal", element: <ProtectedRoute><Attendcal /></ProtectedRoute> },
  { path: "/statistics", element: <ProtectedRoute><Statistics /></ProtectedRoute> },
  { path: "/user", element: <ProtectedRoute><User /></ProtectedRoute> },
]);
