import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {

  const playerName = sessionStorage.getItem("playerName");

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/guest/login";
  };

  return (
    <div className={styles.navbarmain}>

      {/* LEFT SIDE BRAND */}
      <div className={styles.brand}>

        <div className={styles.logoIcon}>⚡</div>

        <div className={styles.logoText}>
          BootOn
          <span className={styles.role}>PLAYER</span>
        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className={styles.navlinks}>

        <span className={styles.username}>
          {playerName}
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