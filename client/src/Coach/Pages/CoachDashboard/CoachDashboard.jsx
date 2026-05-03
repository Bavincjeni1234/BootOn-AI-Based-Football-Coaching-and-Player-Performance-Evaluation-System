import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CoachDashboard.module.css";

const CoachDashboard = () => {

  const [data, setData] = useState({
    players: 0,
    trainings: 0,
    reports: 0,
    rating: 0
  });

  useEffect(() => {
    const cid = sessionStorage.getItem("cid");
    if (!cid) return;

    axios.get(`http://127.0.0.1:8000/CoachDashboard/${cid}/`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("ERROR:", err));
  }, []);

  return (
    <div className={styles.page}>

      <div>
        <p className={styles.eyebrow}>Overview</p>
        <h2 className={styles.title}>Coach Dashboard</h2>
      </div>

      <div className={styles.statsGrid}>

        <div className={styles.statCard}>
          <div className={styles.iconWrap}>🧑‍🤝‍🧑</div>
          <p className={styles.statLabel}>Total Players</p>
          <span className={styles.statValue}>{data.players}</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.iconWrap}>🏋️</div>
          <p className={styles.statLabel}>Trainings</p>
          <span className={styles.statValue}>{data.trainings}</span>
        </div>

        <div className={styles.statCard}>
          <div className={styles.iconWrap}>📋</div>
          <p className={styles.statLabel}>Reports</p>
          <span className={styles.statValue}>{data.reports}</span>
        </div>

        <div className={styles.statCardRating}>
          <div className={styles.iconWrapGold}>⭐</div>
          <p className={styles.statLabel}>Rating</p>
          <span className={styles.statValueGold}>{data.rating}</span>
        </div>

      </div>

    </div>
  );
};

export default CoachDashboard;