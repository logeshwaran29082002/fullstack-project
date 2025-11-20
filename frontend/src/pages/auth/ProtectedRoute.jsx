import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return setIsValid(false);

    axios
      .get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => setIsValid(true))
      .catch(() => {
        localStorage.removeItem("token");
        setIsValid(false);
      });
  }, []);

  if (isValid === null) return <div>Loading...</div>;

  return isValid ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
