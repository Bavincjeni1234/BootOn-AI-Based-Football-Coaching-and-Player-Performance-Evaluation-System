import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyProfile.module.css";

const MyProfile = () => {

  const aid = sessionStorage.getItem("aid");
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/admin/`)
      .then((res) => {
        const data = res.data.admin.find(a => a.id == aid);
        setAdmin(data || {});
      });
  }, [aid]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.avatar} />
          <p className={styles.name}>{admin.admin_name || "Admin"}</p>
          <span className={styles.badge}>Administrator</span>
        </div>

        {/* ── Fields ── */}
        <div className={styles.field}>
          <label>Name</label>
          <span>{admin.admin_name}</span>
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <span>{admin.admin_email}</span>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;