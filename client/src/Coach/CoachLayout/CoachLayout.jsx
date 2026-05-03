import React from "react";
import { Outlet } from "react-router-dom";   // ← Change 1: import Outlet
import Sidebar from "../Components/sidebar/sidebar";
import Navbar from "../Components/navbar/navbar";
import styles from "./CoachLayout.module.css";
import CoachRoutes from "../../Routes/CoachRoutes";

const CoachLayout = () => {
  return (
    <div className={styles.layout}>

      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      <div className={styles.main}>
        <Navbar />

        <div className={styles.content}>
          <CoachRoutes/>
        </div>

      </div>

    </div>
  );
};

export default CoachLayout;