import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./EditProfile.module.css";

const EditProfile = () => {

  const cid = sessionStorage.getItem("cid");

  const [coach, setCoach] = useState({
    coach_name: "",
    coach_email: "",
    coach_qualification: "",
    coach_contact: ""
  });

  useEffect(() => {

    axios.get(`http://127.0.0.1:8000/CoachProfile/${cid}/`)
      .then((res) => {
        setCoach(res.data.coach);
      });

  }, [cid]);

  const handleChange = (e) => {
    setCoach({
      ...coach,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://127.0.0.1:8000/UpdateCoach/${cid}/`, coach)
      .then(() => {
        alert("Profile Updated");
      });
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>

          <label>Name</label>
          <input
            type="text"
            name="coach_name"
            value={coach.coach_name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="coach_email"
            value={coach.coach_email}
            onChange={handleChange}
          />

          <label>Qualification</label>
          <input
            type="text"
            name="coach_qualification"
            value={coach.coach_qualification}
            onChange={handleChange}
          />

          <label>Contact</label>
          <input
            type="text"
            name="coach_contact"
            value={coach.coach_contact}
            onChange={handleChange}
          />

          <button type="submit">
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditProfile;