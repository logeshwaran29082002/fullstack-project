import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Signup from "./pages/auth/Signup";
import Otp from "./pages/auth/Otp";
import Login from "./pages/auth/Login";
import Home from "./pages/auth/Home";
import ResetPassword from "./pages/auth/ResetPassword";
import ResetPasswordToken from "./pages/auth/ResetPasswordToken";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

function App() {
  return (
<GoogleOAuthProvider clientId="1060269320432-7rb5d1kvt2d81mr5r3k217bmoqr23ts1.apps.googleusercontent.com">

      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordToken />} />

        <Route path="*" element={<div>404 - Page not found</div>} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
