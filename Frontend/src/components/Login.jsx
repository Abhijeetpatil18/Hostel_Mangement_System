import React, { useState } from "react";
import styles from "../Login.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      // success path...
      console.log(res);
      if (res.data && res.data.success) {
        alert(`Login Success "${res.data.name}"`);
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          alert(err.response.data?.message || "Invalid email or password");
        } else {
          alert(err.response.data?.message || `Error ${err.response.status}`);
        }
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  return (
    <center>
      <div className={styles["login-container"]}>
        <div className={styles["login-logo"]}>
          <h1>🏨 Hostel Hub</h1>
          <p>Welcome Back</p>
        </div>

        <form className={styles["login-form"]} onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label
              htmlFor="email"
              className="text-left"
              style={{ fontSize: "18px" }}
            >
              {" "}
              E-mail
            </label>
            <input
              type="text"
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
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className={styles["btn-login"]}
            // onClick={navigate("/")}
          >
            Login
          </button>
        </form>

        <div className={styles["register-link"]}>
          Don’t have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
    </center>
  );
}
