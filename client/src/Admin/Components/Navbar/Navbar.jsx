import React from "react";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const adminName = sessionStorage.getItem("adminName");

  const handleLogout = () => {

    sessionStorage.removeItem("aid");
    sessionStorage.removeItem("adminName");

    navigate("/guest/login");
  };

  return (
    <div className={styles.navbarmain}>
      
      {/* LEFT SIDE BRAND */}
      <div className={styles.brand}>
        <div className={styles.logoIcon}>⚡</div>

        <div className={styles.logoText}>
          BootOn
          <span className={styles.role}>ADMIN</span>
        </div>
      </div>


      {/* RIGHT SIDE */}
      <div className={styles.navlinks}>

        <span className={styles.username}>
          {adminName}
        </span>

        <button
          className={styles.logoutBtn}
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default Navbar;