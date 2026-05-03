import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.navbar}>

      <div className={styles.brand}>
        ⚡ BootOn
      </div>

      <div className={styles.links}>
        <Link to="/guest/login">Login</Link>
        <Link to="/guest/registration">Player Register</Link>
      </div>

    </div>
  );
};

export default Navbar;