// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/pages/Login.module.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg("");
      const res = await axios.post("http://localhost:5000/api/login", form);

      const token = res.data.token;
      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Login to your account</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputBox}>
            <label>Password</label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
              />
              <span
                className={styles.showPass}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Reset Password Link */}
          <p
            className={styles.forgot}
            onClick={() => navigate("/reset-password")}
          >
            Forgot Password?
          </p>

          {errorMsg && <p style={{ color: "crimson" }}>{errorMsg}</p>}

          <button
            className={`${styles.btn} ${loading ? styles.disabled : ""}`}
            type="submit"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className={styles.signupLink}>
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
