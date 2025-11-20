import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/pages/Signup.module.css'

function Signup() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:5000/api/signup", form)

      // 🔥 Pass email + userId to OTP page (VERY IMPORTANT)
      navigate("/verify-otp", {
        state: { 
          email: form.email,
          userId: response.data.userId   // 👈 BACKEND RETURNED USERID
        }
      })

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed")
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.signupBox} onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className={styles.inputGroup}>
          <label>Name</label>
          <input
            name="name"
            type="text"
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Enter password"
          />
        </div>

        <button className={styles.btn} type="submit">Sign Up</button>

       <p className={styles.loginLink}>
  Already have an account? <span onClick={() => navigate("/login")}>Login</span>
</p>

      </form>
    </div>
  )
}

export default Signup
