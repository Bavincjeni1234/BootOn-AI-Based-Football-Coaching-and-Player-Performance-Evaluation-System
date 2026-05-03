import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./EditProfile.module.css";

const EditProfile = () => {

  const pid = sessionStorage.getItem("pid");

  const [player, setPlayer] = useState({
    player_name: "",
    player_email: "",
    player_weight: "",
    player_height: "",
    player_strongfoot: "",
    player_position: "",
    player_dob: ""
  });

  // Load player details
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/PlayerProfile/${pid}/`)
      .then((res) => {
        setPlayer(res.data.player);
      })
      .catch((err) => console.log(err));
  }, [pid]);

  // Handle input change
  const handleChange = (e) => {
    setPlayer({
      ...player,
      [e.target.name]: e.target.value
    });
  };

  // Save changes
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://127.0.0.1:8000/UpdatePlayer/${pid}/`, player)
      .then(() => {
        alert("Profile Updated Successfully");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2 className={styles.title}>Edit Profile</h2>

        <form className={styles.form} onSubmit={handleSubmit}>

          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              name="player_name"
              value={player.player_name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              name="player_email"
              value={player.player_email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Weight</label>
            <input
              type="text"
              name="player_weight"
              value={player.player_weight}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Height</label>
            <input
              type="text"
              name="player_height"
              value={player.player_height}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Strong Foot</label>
            <input
              type="text"
              name="player_strongfoot"
              value={player.player_strongfoot}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Position</label>
            <input
              type="text"
              name="player_position"
              value={player.player_position}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Date of Birth</label>
            <input
              type="date"
              name="player_dob"
              value={player.player_dob}
              onChange={handleChange}
            />
          </div>

          <button className={styles.saveBtn}>
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditProfile;