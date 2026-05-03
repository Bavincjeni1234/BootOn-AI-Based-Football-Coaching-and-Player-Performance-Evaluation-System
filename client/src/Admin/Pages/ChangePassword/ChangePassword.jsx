import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ChangePassword.module.css";

const ChangePassword = () => {

  const aid = sessionStorage.getItem("aid");

  const [admin, setAdmin] = useState({});
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/admin/")
      .then((res) => {
        const data = res.data.admin.find(a => a.id == aid);
        setAdmin(data || {});
      });
  }, [aid]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.currentPassword !== admin.admin_password) {
      alert("Current password incorrect");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios.put(`http://127.0.0.1:8000/EditAdmin/${aid}/`, {
      name: admin.admin_name,
      email: admin.admin_email,
      password: form.newPassword
    })
    .then(() => alert("Password Updated"));
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        {/* ── Header ── */}
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Change Password</h2>
        </div>

        {/* ── Form ── */}
        <form className={styles.form} onSubmit={handleSubmit}>

          <div className={styles.field}>
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              onChange={handleChange}
            />
          </div>

          <div className={styles.field}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Update Password
          </button>

        </form>

      </div>
    </div>
  );
};

export default ChangePassword;