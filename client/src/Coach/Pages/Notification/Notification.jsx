import React, { useState } from "react";
import axios from "axios";
import styles from "./Notification.module.css";

const Notification = () => {

  const [details, setDetails] = useState("");

  const handleSend = () => {

    const coachId = sessionStorage.getItem("cid");

    if (!details) {
      alert("Enter Notification");
      return;
    }

    const formData = new FormData();
    formData.append("notification_details", details);

    axios.post(`http://127.0.0.1:8000/SendNotification/${coachId}/`, formData)
      .then((res) => {
        alert(res.data.message);
        setDetails("");
      })
      .catch((err) => {
        console.log(err);
        alert("Error sending notification");
      });
  };

  return (

    <div className={styles.page}>

      {/* ── Page Header ── */}
      <div className={styles.pageHeader}>
        <h2 className={styles.title}>
          Send Notification
          <span>Broadcast a message to all your accepted players</span>
        </h2>
        <div className={styles.badge}>Live Broadcast</div>
      </div>

      {/* ── Card ── */}
      <div className={styles.card}>

        {/* Card Header */}
        <div className={styles.cardHeader}>
          <div className={styles.iconBox}>🔔</div>
          <div>
            <h3>New Notification</h3>
            <p>All accepted players will receive this message instantly</p>
          </div>
        </div>

        {/* Card Body */}
        <div className={styles.cardBody}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Message</label>
            <textarea
              className={styles.textarea}
              placeholder="Type your notification message here..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
        </div>

        {/* Card Footer */}
        <div className={styles.cardFooter}>
          <span className={styles.footerHint}>
            Sends to all accepted players
          </span>
          <button className={styles.sendBtn} onClick={handleSend}>
            Send Notification
          </button>
        </div>

      </div>

    </div>

  );
};

export default Notification;