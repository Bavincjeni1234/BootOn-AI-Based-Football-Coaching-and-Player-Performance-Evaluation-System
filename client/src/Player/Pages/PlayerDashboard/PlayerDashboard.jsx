import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PlayerDashboard.module.css";

const PlayerDashboard = () => {

  const [data, setData] = useState({
    total: 0,
    completed: 0,
    pending: 0
  });

  useEffect(() => {
    const pid = sessionStorage.getItem("pid");

    axios.get(`http://127.0.0.1:8000/PlayerDashboard/${pid}/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className={styles.page}>

      <div>
        <p className={styles.eyebrow}>Overview</p>
        <h2 className={styles.title}>Player Dashboard</h2>
      </div>

      <div className={styles.cards}>

        <div className={styles.card}>
          <div className={styles.iconWrap}>🏋️</div>
          <h4>Total Trainings</h4>
          <h2>{data.total}</h2>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrap}>✅</div>
          <h4>Completed</h4>
          <h2>{data.completed}</h2>
        </div>

        <div className={styles.card}>
          <div className={styles.iconWrapGold}>⏳</div>
          <h4>Pending</h4>
          <h2>{data.pending}</h2>
        </div>

      </div>

    </div>
  );
};

export default PlayerDashboard;