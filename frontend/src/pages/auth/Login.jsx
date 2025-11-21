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
      const res = await axios.post("http://localhost:5000/api/login", form);

      const token = res.data.token;
      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.frame}>

        {/* LEFT PANEL – same as Signup */}
        <div className={styles.left}>
          <div className={styles.leftContent}>
            <h1>WELCOME<br/>BACK!</h1>
            <p>Login to continue your journey</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Login</h2>

            {/* Email */}
            <label className={styles.field}>
              <span className={styles.labelText}>Email</span>
              <div className={styles.inputRow}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  required
                />
              </div>
            </label>

            {/* Password */}
            <label className={styles.field}>
              <span className={styles.labelText}>Password</span>

              <div className={styles.inputRow}>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                />

                <span
                  className={styles.showPass}
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "Hide" : "Show"}
                </span>
              </div>
            </label>

            {/* Forgot */}
            <p
              className={styles.forgot}
              onClick={() => navigate("/reset-password")}
            >
              Forgot Password?
            </p>

            {errorMsg && <p className={styles.error}>{errorMsg}</p>}

            <button className={styles.cta} type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className={styles.footerText}>
              Don't have an account?
              <button
                type="button"
                className={styles.link}
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;
