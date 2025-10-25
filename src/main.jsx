import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./Components/Context/Router";
import AuthProvider from "./Components/Context/AuthContext";

const root = createRoot(document.getElementById('root'))
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
