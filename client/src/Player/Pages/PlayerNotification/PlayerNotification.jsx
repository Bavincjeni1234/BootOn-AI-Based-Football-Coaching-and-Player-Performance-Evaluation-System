import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PlayerNotification.module.css";

const Notification = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const playerId = sessionStorage.getItem("pid");

    axios.get(`http://127.0.0.1:8000/PlayerNotification/${playerId}/`)
      .then((res) => {
        setNotifications(res.data.notifications);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <div className={styles.notificationPage}>

      <h2 className={styles.title}>Notifications</h2>

      {notifications.length > 0 ? (

        notifications.map((item, index) => (

          <div
            key={index}
            className={styles.notificationCard}
          >
            {item.notification_details}
          </div>

        ))

      ) : (

        <p className={styles.noNotification}>No Notifications</p>

      )}

    </div>

  );
};

export default Notification;