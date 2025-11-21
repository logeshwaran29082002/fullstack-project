import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../styles/pages/ResetPasswordToken.module.css";

function ResetPasswordToken() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/reset-password/${token}`,
        { password }
      );

      alert(res.data.message);
      setMsg(res.data.message);

      setTimeout(() => navigate("/login"), 1000);

    } catch (err) {
      setMsg(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.frame}>

        {/* LEFT SIDE */}
        <div className={styles.left}>
          <div className={styles.leftContent}>
            <h1>New<br/>Password</h1>
            <p>Create a strong password to secure your account</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2> Create New Password</h2>

            <label className={styles.field}>
              <span className={styles.labelText}>New Password</span>
              <div className={styles.inputRow}>
                <input
                  type="password"
                  placeholder="Enter new password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </label>

            <button className={styles.cta} type="submit">
              Update Password
            </button>

            {msg && <p className={styles.msg}>{msg}</p>}
          </form>
        </div>

      </div>
    </div>
  );
}

export default ResetPasswordToken;
