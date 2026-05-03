import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./PlayerReg.module.css";

const Player = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [strongFoot, setStrongFoot] = useState("");
  const [position, setPosition] = useState("");
  const [dob, setDob] = useState("");
  const [proof, setProof] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/category/")
      .then((res) => setCategoryData(res.data.category))
      .catch(console.error);
  }, []);

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setWeight("");
    setHeight("");
    setStrongFoot("");
    setPosition("");
    setDob("");
    setCategoryId("");
    setPhoto(null);
    setProof(null);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("txt_name", name);
    formData.append("txt_email", email);
    formData.append("txt_password", password);
    formData.append("txt_weight", weight);
    formData.append("txt_height", height);
    formData.append("txt_strongfoot", strongFoot);
    formData.append("txt_position", position);
    formData.append("txt_dob", dob);
    formData.append("category_id", categoryId);

    if (photo) formData.append("txt_photo", photo);
    if (proof) formData.append("txt_proof", proof);

    axios
      .post("http://127.0.0.1:8000/player/", formData)
      .then((res) => {
        alert(res.data.message);
        clearForm();
      })
      .catch(console.error);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.cardBody}>

          {/* FORM START */}
          <form autoComplete="off" onSubmit={handleSave}>

            {/* Header */}
            <p className={styles.eyebrow}>Join BootOn</p>
            <h2 className={styles.title}>Player Registration</h2>

            {/* Name + Email */}
            <div className={styles.fieldGrid}>

              <div className={styles.field}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="player_name"
                  autoComplete="off"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label>Email</label>
                <input
                  type="email"
                  name="player_email"
                  autoComplete="off"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

            </div>

            {/* Password */}
            <div className={styles.field}>
              <label>Password</label>
              <input
                type="password"
                name="player_password"
                autoComplete="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className={styles.divider} />

            {/* Weight + Height */}
            <div className={styles.fieldGrid}>

              <div className={styles.field}>
                <label>Weight (kg)</label>
                <input
                  type="number"
                  name="player_weight"
                  autoComplete="off"
                  placeholder="75"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label>Height (cm)</label>
                <input
                  type="number"
                  name="player_height"
                  autoComplete="off"
                  placeholder="180"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>

            </div>

            {/* Strong Foot + Position */}
            <div className={styles.fieldGrid}>

              <div className={styles.field}>
                <label>Strong Foot</label>
                <select
                  value={strongFoot}
                  onChange={(e) => setStrongFoot(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Right">Right</option>
                  <option value="Left">Left</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Position</label>
                <input
                  type="text"
                  name="player_position"
                  autoComplete="off"
                  placeholder="e.g. Midfielder"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>

            </div>

            {/* DOB + Category */}
            <div className={styles.fieldGrid}>

              <div className={styles.field}>
                <label>Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>

              <div className={styles.field}>
                <label>Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categoryData.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div className={styles.divider} />

            {/* Uploads */}
            <div className={styles.fieldGrid}>

              <div className={styles.field}>
                <label>Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>

              <div className={styles.field}>
                <label>ID Proof</label>
                <input
                  type="file"
                  onChange={(e) => setProof(e.target.files[0])}
                />
              </div>

            </div>

            {/* Submit */}
            <button type="submit" className={styles.submitBtn}>
              Register Now
            </button>

          </form>
          {/* FORM END */}

        </div>
      </div>
    </div>
  );
};

export default Player;