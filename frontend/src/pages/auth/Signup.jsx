import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import styles from "../../styles/pages/Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✔ Name validation
    if (!/^[A-Za-z ]{5,30}$/.test(form.name)) {
      return alert("Enter a valid name (Only letters and spaces, 5-30 characters)");
    }

    // ✔ Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|:;"'<>,.?/]).{8,}$/;

    if (!passwordRegex.test(form.password)) {
      return alert(
        "Password must contain:\n• 1 Capital Letter\n• 1 Number\n• 1 Symbol\n• Minimum 8 Characters"
      );
    }

    // ✔ Email validation
    if (!form.email.toLowerCase().endsWith("@gmail.com")) {
      return alert("Only Gmail email IDs are allowed!");
    }

    try {
      // ✔ SEND DATA TO BACKEND
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        form
      );

      // ✔ MOVE TO OTP VERIFY PAGE
      navigate("/verify-otp", {
        state: {
          email: form.email,
          userId: response.data.userId,
        },
      });
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.frame}>
        <div className={styles.left}>
          <div className={styles.leftContent}>
            <h1>
              WELCOME
              <br />
              BACK!
            </h1>
            <p>Access granted. Your digital world awaits.</p>
          </div>
        </div>

        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

            {/* USERNAME */}
            <label className={styles.field}>
              <span className={styles.labelText}>Username</span>
              <div className={styles.inputRow}>
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <svg className={styles.icon} viewBox="0 0 24 24" width="18">
                  <path
                    fill="currentColor"
                    d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z"
                  />
                </svg>
              </div>
            </label>

            {/* EMAIL */}
            <label className={styles.field}>
              <span className={styles.labelText}>Email</span>
              <div className={styles.inputRow}>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <svg className={styles.icon} viewBox="0 0 24 24" width="18">
                  <path
                    fill="currentColor"
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                  />
                </svg>
              </div>
            </label>

            {/* PASSWORD */}
            <label className={styles.field}>
              <span className={styles.labelText}>Password</span>
              <div className={styles.inputRow}>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />

                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer", pointerEvents: "auto" }}
                >
                  {showPassword ? (
                    <path
                      fill="currentColor"
                      d="M17 8h-1V6a4 4 0 0 0-8 0h2a2 2 0 1 1 4 0v2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zm0 12H7V10h10v10z"
                    />
                  ) : (
                    <path
                      fill="currentColor"
                      d="M17 8V6a5 5 0 0 0-10 0v2H5v14h14V8h-2zm-8 0V6a3 3 0 0 1 6 0v2H9z"
                    />
                  )}
                </svg>
              </div>
            </label>

            {/* GOOGLE LOGIN */}
       <div className={styles.googleBtn}>
  <GoogleLogin
    onSuccess={async (credentialResponse) => {
      try {
        const decoded = jwtDecode(credentialResponse.credential);

        await axios.post("http://localhost:5000/api/google-login", {
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
        });

        navigate("/home");
      } catch (err) {
        alert("Google Login Failed");
      }
    }}
    onError={() => {
      alert("Google Login Failed");
    }}
  />
</div>

            {/* NORMAL SIGNUP BUTTON */}
            <button type="submit" className={styles.cta}>
              Sign Up
            </button>

            <p className={styles.footerText}>
              Already have an account?
              <button
                type="button"
                className={styles.link}
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

export default Signup;
