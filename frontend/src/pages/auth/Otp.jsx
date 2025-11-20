import styles from '../../styles/pages/Otp.module.css'
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOtp() {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const email = state?.email;
  const userId = state?.userId;   // 👈 SUPER IMPORTANT

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // 🔥 Send userId + otp (BACKEND NEEDS THIS)
      await axios.post("http://localhost:5000/api/verify-otp", {
        userId,
        otp,
      });

      alert("OTP Verified Successfully!");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);
      
      // 🔥 Resend OTP API
      await axios.post("http://localhost:5000/api/resend-otp", {
        userId,
      });

      alert("OTP resent successfully!");

    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.otpContainer}>
      <div className={styles.card}>
        <h2 className={styles.title}>Verify Your Email</h2>
        <p className={styles.subtitle}>OTP sent to: {email}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.otpInput}
            placeholder="Enter 6-digit OTP"
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            type="submit"
            className={`${styles.verifyBtn} ${loading ? styles.disabled : ""}`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className={styles.resendText}>
          Didn’t receive the code?{" "}
          <span
            className={`${styles.resendLink} ${
              loading ? styles.disabled : ""
            }`}
            onClick={handleResendOtp}
          >
            Resend OTP
          </span>
        </p>
      </div>
    </div>
  );
}

export default VerifyOtp;
