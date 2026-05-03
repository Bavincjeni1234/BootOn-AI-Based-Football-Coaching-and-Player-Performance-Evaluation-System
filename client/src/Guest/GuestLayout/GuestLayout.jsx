import React from "react";
import styles from "./GuestLayout.module.css";
import Navbar from "../Components/Navbar/Navbar";
import GuestRoutes from "../../Routes/GuestRoutes";

const GuestLayout = () => {
  return (
    <div className={styles.guestPage}>

      {/* Navbar */}
      <div className={styles.navbar}>
        <Navbar />
      </div>

      {/* Hero Quote */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>BootOn — Elite Training Platform</span>
          <h1 className={styles.quote}>
            Legends don't wait for<br />the right moment.
            <span className={styles.quoteAccent}> They create it.</span>
          </h1>
          <p className={styles.quoteSubtext}>
            Join the platform built for players who demand more.
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className={styles.content}>
        <GuestRoutes />
      </div>

    </div>
  );
};

export default GuestLayout;