import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AddAttributes.module.css";

const ATTRIBUTES = [
  "finishing", "passing", "shooting", "dribbling", "defending",
  "pace", "physical", "stamina", "heading", "vision"
];

const AddAttributes = () => {

  // ✅ FIX: correct param name from route
  const { id: pid } = useParams();

  const navigate = useNavigate();
  const coachId = sessionStorage.getItem("cid");

  const [form, setForm] = useState(
    Object.fromEntries(ATTRIBUTES.map((k) => [k, ""]))
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ SAFETY CHECK
    if (!pid || !coachId) {
      alert("Invalid player or coach ID");
      return;
    }

    const formData = new FormData();
    formData.append("player_id", pid);
    formData.append("coach_id", coachId);

    ATTRIBUTES.forEach((key) => {
      formData.append(key, form[key]);
    });

    axios.post("http://127.0.0.1:8000/addattributes/", formData)
      .then(() => {
        alert("Attributes Added Successfully");
        navigate("/coach/acceptedplayers");
      })
      .catch((err) => {
        console.error(err);
        alert("Error adding attributes");
      });
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* Header */}
        <div className={styles.cardHeader}>
          <span className={styles.eyebrow}>Player #{pid}</span>
          <h2 className={styles.title}>Add Player Attributes</h2>
        </div>

        {/* Form */}
        <form className={styles.form} onSubmit={handleSubmit}>

          <div className={styles.grid}>
            {ATTRIBUTES.map((key) => (
              <div key={key} className={styles.field}>
                <label>
                  {key}
                  <span>{form[key] !== "" ? form[key] : ""}</span>
                </label>
                <input
                  type="number"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  placeholder="0 – 100"
                  min="0"
                  max="100"
                  required
                />
              </div>
            ))}
          </div>

          <p className={styles.hint}>All values must be between 0 and 100</p>

          <div className={styles.divider} />

          <button type="submit" className={styles.submitBtn}>
            Save Attributes
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddAttributes;