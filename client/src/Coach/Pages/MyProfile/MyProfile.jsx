import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MyProfile.module.css";

const MyProfile = () => {

  const cid = sessionStorage.getItem("cid");

  const [profile, setProfile] = useState({});

  useEffect(() => {

    axios.get(`http://127.0.0.1:8000/CoachProfile/${cid}/`)
      .then((res) => {
        setProfile(res.data.coach);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [cid]);

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>My Profile</h2>

        <div className={styles.field}>
          <label>Name</label>
          <input type="text" value={profile.coach_name || ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Email</label>
          <input type="email" value={profile.coach_email || ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Qualification</label>
          <input type="text" value={profile.coach_qualification || ""} readOnly />
        </div>

        <div className={styles.field}>
          <label>Contact</label>
          <input type="text" value={profile.coach_contact || ""} readOnly />
        </div>

      </div>

    </div>
  );
};

export default MyProfile;