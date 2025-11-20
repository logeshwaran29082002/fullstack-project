import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "../../styles/pages/ResetPasswordToken.module.css";

function ResetPasswordToken() {
  const { token } = useParams();
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
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        
        <h2 className={styles.title}>Enter New Password</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <input
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.btn}>
            Reset Password
          </button>
        </form>

        {msg && <p className={styles.msg}>{msg}</p>}
        
      </div>
    </div>
  );
}

export default ResetPasswordToken;
