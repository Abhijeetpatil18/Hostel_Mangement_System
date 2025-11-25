import React, { useState } from "react";
import styles from "../Register.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("clicked");

    const username = formData.username?.trim();
    const email = formData.email?.trim();
    const password = formData.password?.trim();

    const emailOk = /\S+@\S+\.\S+/.test(email);
    if (!username || !email || !password) {
      alert("Please fill all fields!");
      return;
    }
    if (!emailOk) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
      });

      console.log(res);
      if (res.data?.success) {
        toast.success(`Registartion successfull`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setFormData({ username: "", email: "", password: "" });
        navigate("/login");
      } else {
        alert(res.data?.message || "Registration failed");
      }
    } catch (err) {
      const apiMsg = err?.response?.data?.message || err?.response?.data?.error;
      console.error("Registration error:", err);
      alert(apiMsg || "Server error. Please try again later.");
    }
  };

  return (
    <center>
      <div className={styles["register-container"]}>
        <div className={styles["register-logo"]}>
          <h1>🏨 Hostel Hub</h1>
          <p>Create Your Account</p>
        </div>

        {/* FIX: call handler directly */}
        <form className={styles["register-form"]} onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label
              htmlFor="username"
              className="text-left"
              style={{ fontSize: "18px" }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className={styles["form-group"]}>
            <label
              htmlFor="email"
              className="text-left"
              style={{ fontSize: "18px" }}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles["form-group"]}>
            <label
              htmlFor="password"
              className="text-left "
              style={{ fontSize: "18px" }}
            >
              🔒 Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className={styles["btn-register"]}
            // optional: keep or remove; if kept, wrap to avoid immediate call
            // onClick={() => console.log("clicked by")}
          >
            Register Now
          </button>
        </form>

        <div className={styles["login-link"]}>
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </center>
  );
}
