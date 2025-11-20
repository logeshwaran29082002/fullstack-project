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
      const res = await axios.post("http://localhost:5000/api/reset-password", { email });

      // backend returns token
      const token = res.data.token;

      alert("Reset token sent to your email!");
      navigate(`/reset-password/${token}`);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

 return (
  <div className={styles.container}>
    <div className={styles.card}>
      <h2 className={styles.h1}>Reset Password</h2>

      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.btn}>
          Send Reset Token
        </button>
      </form>

      {msg && <p className={styles.error}>{msg}</p>}
    </div>
  </div>
);
}

export default ResetPassword;
