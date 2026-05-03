import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./EditProfile.module.css";

const EditProfile = () => {

  const aid = sessionStorage.getItem("aid");

  const [admin, setAdmin] = useState({
    admin_name: "",
    admin_email: "",
    admin_password: ""
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/admin/")
      .then((res) => {
        const data = res.data.admin.find(a => a.id == aid);
        setAdmin(data || { admin_name: "", admin_email: "", admin_password: "" });
      });
  }, [aid]);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:8000/EditAdmin/${aid}/`, {
      name: admin.admin_name,
      email: admin.admin_email,
      password: admin.admin_password
    })
    .then(() => alert("Profile Updated"));
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        {/* ── Header ── */}
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>Edit Profile</h2>
        </div>

        {/* ── Form ── */}
        <form className={styles.form} onSubmit={handleSubmit}>

          <div className={styles.field}>
            <label>Name</label>
            <input
              type="text"
              name="admin_name"
              value={admin.admin_name}
              onChange={handleChange}
              placeholder="Admin name"
            />
          </div>

          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              name="admin_email"
              value={admin.admin_email}
              onChange={handleChange}
              placeholder="Admin email"
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Update Profile
          </button>

        </form>

      </div>
    </div>
  );
};

export default EditProfile;