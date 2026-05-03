import React from "react";
import { Link } from "react-router-dom";
import BasicRoutes from "../../Routes/BasicRoutes";
import styles from "./BasicLayout.module.css";

const BasicLayout = () => {
  return (
    <div className={styles.container}>

      <div className={styles.navbar}>

        <Link to="/Basics/UseStateHook">
          UseState Hook
        </Link>

        <Link to="/Basics/UseEffectHook">
          UseEffect Hook
        </Link>

      </div>

      <div className={styles.content}>
        <BasicRoutes />
      </div>

    </div>
  );
};

export default BasicLayout;