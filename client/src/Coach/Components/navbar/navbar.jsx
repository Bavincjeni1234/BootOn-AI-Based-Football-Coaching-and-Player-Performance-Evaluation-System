import React from "react";
import styles from "./navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();
  const coachName = sessionStorage.getItem("coachName");

  const handleLogout = () => {
    sessionStorage.removeItem("cid");
    sessionStorage.removeItem("coachName");
    navigate("/guest/login");
  };

  return (
    <div className={styles.navbarmain}>

      {/* LEFT SIDE */}
      <div className={styles.brand}>
        <div className={styles.logoIcon}>⚡</div>

        <div className={styles.logoText}>
          BootOn
          <span className={styles.role}>COACH</span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className={styles.navlinks}>

        <span className={styles.username}>
          {coachName}
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