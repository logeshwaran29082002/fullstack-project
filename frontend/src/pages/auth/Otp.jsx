import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/pages/Otp.module.css";

function Otp() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const email = state?.email;
  const userId = state?.userId;

  if (!email || !userId) {
    navigate("/signup");
    return null;
  }

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/verify-otp", {
        userId,
        otp,
      });

      alert("OTP Verified Successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/resend-otp", { userId });

      alert("OTP Resent Successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.frame}>

        {/* LEFT PANEL (same signup style) */}
        <div className={styles.left}>
          <div className={styles.leftContent}>
            <h1>VERIFY<br/>OTP</h1>
            <p>Enter OTP sent to your registered email.</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Enter OTP</h2>

            <label className={styles.field}>
              <span className={styles.labelText}>OTP Code</span>

              <div className={styles.inputRow}>
                <input
                  type="text"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  required
                />

                {/* OTP ICON */}
                <svg className={styles.icon} viewBox="0 0 24 24" width="20">
                  <path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
            </label>

            <button className={styles.cta} type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <p className={styles.footerText}>
              Didn’t receive the OTP?
              <button type="button" className={styles.link} onClick={handleResendOtp}>
                Resend OTP
              </button>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Otp;
