import React from "react";
import styles from "./sidebar.module.css";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.sidebar}>

      <nav className={styles.menu}>

        {/* PLAYER MANAGEMENT */}
        <Link
          to="/coach/viewplayers"
          className={`${styles.link} ${isActive("/coach/viewplayers") ? styles.active : ""}`}
        >
          View Players
        </Link>

        <Link
          to="/coach/acceptedplayers"
          className={`${styles.link} ${isActive("/coach/acceptedplayers") ? styles.active : ""}`}
        >
          Accepted Players
        </Link>

        <div className={styles.divider}></div>

        {/* COMMUNICATION */}
        <Link
          to="/coach/notification"
          className={`${styles.link} ${isActive("/coach/notification") ? styles.active : ""}`}
        >
          Notifications
        </Link>

        <div className={styles.divider}></div>

        {/* ACCOUNT */}
        <Link
          to="/coach/myprofile"
          className={`${styles.link} ${isActive("/coach/myprofile") ? styles.active : ""}`}
        >
          My Profile
        </Link>

        <Link
          to="/coach/editprofile"
          className={`${styles.link} ${isActive("/coach/editprofile") ? styles.active : ""}`}
        >
          Edit Profile
        </Link>

        <Link
          to="/coach/changepassword"
          className={`${styles.link} ${isActive("/coach/changepassword") ? styles.active : ""}`}
        >
          Change Password
        </Link>

      </nav>

    </div>
  );
};

export default Sidebar;