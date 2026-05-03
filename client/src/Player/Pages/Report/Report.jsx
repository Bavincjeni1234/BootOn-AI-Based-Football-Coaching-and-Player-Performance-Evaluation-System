import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Report.module.css";

const Report = () => {

  const { trainingId } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = () => {
    if (!details || !file) { alert("Please fill all fields"); return; }

    const formData = new FormData();
    formData.append("training_id", trainingId);
    formData.append("report_details", details);
    formData.append("report_file", file);

    axios.post("http://127.0.0.1:8000/AddReport/", formData)
      .then((res) => { alert(res.data.message); navigate("/player/mytraining"); })
      .catch((err) => { console.error(err); alert("Failed to submit report"); });
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>

        {/* ── Header ── */}
        <div className={styles.cardHeader}>
          <h2 className={styles.title}>Submit Training Report</h2>
          <span className={styles.idPill}>{trainingId}</span>
        </div>

        {/* ── Form ── */}
        <div className={styles.form}>

          <div className={styles.field}>
            <label>Report Details</label>
            <textarea
              className={styles.textarea}
              placeholder="Describe what you completed, progress made, challenges faced..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Upload File</label>
            <input
              type="file"
              className={styles.fileInput}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className={styles.divider} />

          <button className={styles.submitBtn} onClick={handleSubmit}>
            Submit Report
          </button>

        </div>
      </div>
    </div>
  );
};

export default Report;