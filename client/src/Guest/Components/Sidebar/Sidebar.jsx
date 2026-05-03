import React from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={styles.guestside}>

            <div className={styles.logo}>
                BootOn
            </div>

            <div className={styles.menu}>
                <Link to="/">Home</Link>
                <Link to="/guest/login">Login</Link>
                <Link to="/guest/registration">Player Register</Link>
            </div>

        </div>
    );
}

export default Sidebar;