import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {

  const [players, setPlayers] = useState(0);
  const [coaches, setCoaches] = useState(0);
  const [pending, setPending] = useState(0);

  const fetchData = async () => {
    try {

      // GET PLAYERS
      const playerRes = await axios.get("http://127.0.0.1:8000/player/");
      const playerData = playerRes.data.player;

      let approvedPlayers = 0;
      let pendingPlayers = 0;

      playerData.forEach((p) => {
        if (p.player_status === "1") {
          approvedPlayers++;
        }
        if (p.player_status === "0") {
          pendingPlayers++;
        }
      });

      setPlayers(approvedPlayers);
      setPending(pendingPlayers);


      // GET COACHES
      const coachRes = await axios.get("http://127.0.0.1:8000/coach/");
      const coachData = coachRes.data.coach;

      setCoaches(coachData.length);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.dashboardContainer}>

      <h1 className={styles.title}>Admin Dashboard</h1>
      <p className={styles.subtitle}>Manage players and coaches</p>

      <div className={styles.cards}>

        <div className={styles.card}>
          <div className={styles.icon}>👤</div>
          <h3>Total Players</h3>
          <p className={styles.number}>{players}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>🎯</div>
          <h3>Total Coaches</h3>
          <p className={styles.number}>{coaches}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.icon}>⏳</div>
          <h3>Pending Players</h3>
          <p className={styles.number}>{pending}</p>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;