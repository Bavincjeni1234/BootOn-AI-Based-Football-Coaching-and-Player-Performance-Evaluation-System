import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./MyProfile.module.css";

const MyProfile = () => {

  const navigate = useNavigate();

  const [profile, setProfile] = useState({});

  const pid = sessionStorage.getItem("pid");

  useEffect(() => {

    axios
      .get(`http://127.0.0.1:8000/PlayerProfile/${pid}/`)
      .then((res) => {
        setProfile(res.data.player);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [pid]);

  return (
    <div className={styles.myProfile}>

      <div className={styles.card}>

        <h2>My Profile</h2>

        <div className={styles.profileField}>
          <label>Name</label>
          <input
            type="text"
            value={profile.player_name || ""}
            readOnly
          />
        </div>

        <div className={styles.profileField}>
          <label>Email</label>
          <input
            type="email"
            value={profile.player_email || ""}
            readOnly
          />
        </div>

        <div className={styles.profileField}>
          <label>Weight</label>
          <input
            type="text"
            value={profile.player_weight || ""}
            readOnly
          />
        </div>

        <div className={styles.profileField}>
          <label>Height</label>
          <input
            type="text"
            value={profile.player_height || ""}
            readOnly
          />
        </div>

        <div className={styles.profileField}>
          <label>Strong Foot</label>
          <input
            type="text"
            value={profile.player_strongfoot || ""}
            readOnly
          />
        </div>

        <div className={styles.profileField}>
          <label>Position</label>
          <input
            type="text"
            value={profile.player_position || ""}
            readOnly
          />
        </div>

        <div className={styles.profileField}>
          <label>Date of Birth</label>
          <input
            type="text"
            value={profile.player_dob || ""}
            readOnly
          />
        </div>

        <div className={styles.profileField}>
          <label>Category</label>
          <input
            type="text"
            value={profile.category || ""}
            readOnly
          />
        </div>

        <button
          className={styles.editBtn}
          onClick={() => navigate("/player/editprofile")}
        >
          Edit Profile
        </button>

      </div>

    </div>
  );
};

export default MyProfile;