import React, { useState } from "react";
import styles from "./Login.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      const res = await axios.post(
        "http://127.0.0.1:8000/Login/",
        { email, password }
      );

      const { role, id, name, message } = res.data;

      alert(message);

      if (role === "admin") {
        sessionStorage.setItem("aid", id);
        sessionStorage.setItem("adminName", name);
        navigate("/admin/");
      }

      else if (role === "coach") {
        sessionStorage.setItem("cid", id);
        sessionStorage.setItem("coachName", name);
        navigate("/coach/");
      }

      else if (role === "player") {
        sessionStorage.setItem("pid", id);
        sessionStorage.setItem("playerName", name);
        navigate("/player/");
      }

    } catch (err) {
      console.error(err);
      alert("Login Failed");
    }

  };

  return (
    <div className={styles.loginPage}>

      <div className={styles.loginCard}>

        <p className={styles.brand}>BootOn</p>

        <h2 className={styles.title}>Welcome back</h2>
        <p className={styles.subtitle}>Sign in to your account</p>

        {/* FORM WITH AUTOCOMPLETE DISABLED */}
        <form autoComplete="off">

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="you@example.com"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="••••••••"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.divider}></div>

          <button
            type="button"
            className={styles.loginBtn}
            onClick={handleLogin}
          >
            Sign In
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;