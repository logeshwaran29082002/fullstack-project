import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/pages/ResetPassword.module.css";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/reset-password",
        { email }
      );

      const token = res.data.token;

      alert("Reset token sent to your email!");
      navigate(`/reset-password/${token}`);
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.frame}>
        
        {/* LEFT PANEL */}
        <div className={styles.left}>
          <div className={styles.leftContent}>
            <h1>Reset<br/>Password</h1>
            <p>Enter your registered email to get the reset link.</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>

            <h2>Reset Password</h2>

            <label className={styles.field}>
              <span className={styles.labelText}>Email</span>

              <div className={styles.inputRow}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>

            <button className={styles.cta} type="submit">
              Send Reset Token
            </button>

            {msg && <p className={styles.error}>{msg}</p>}

            <p className={styles.footerText}>
              Back to
              <button
                className={styles.link}
                type="button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default ResetPassword;
