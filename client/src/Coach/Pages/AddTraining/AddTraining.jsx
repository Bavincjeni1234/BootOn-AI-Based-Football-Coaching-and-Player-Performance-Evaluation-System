import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AddTraining.module.css";

const AddTraining = () => {

  // ✅ FIX: correct param mapping
  const { id: rid } = useParams();

  const navigate = useNavigate();

  const [details, setDetails] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ safety check
    if (!rid) {
      alert("Invalid request ID");
      return;
    }

    const formData = new FormData();
    formData.append("request_id", rid);
    formData.append("details", details);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("file", file);

    axios.post("http://127.0.0.1:8000/AddTraining/", formData)
      .then(() => {
        alert("Training Added Successfully");

        // ✅ redirect
        navigate("/coach/acceptedplayers");
      })
      .catch((err) => {
        console.error("AddTraining Error:", err);
        alert("Error adding training");
      });
  };

  return (
    <div className={styles.page}>

      <h2 className={styles.title}>Add Training</h2>

      <form className={styles.form} onSubmit={handleSubmit}>

        <table className={styles.formTable}>
          <tbody>

            <tr>
              <td>Details</td>
              <td>
                <textarea
                  placeholder="Enter training details..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Start Date</td>
              <td>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>End Date</td>
              <td>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </td>
            </tr>

            <tr>
              <td>Upload File</td>
              <td>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </td>
            </tr>

            <tr>
              <td colSpan="2">
                <button className={styles.submitBtn} type="submit">
                  Submit
                </button>
              </td>
            </tr>

          </tbody>
        </table>

      </form>

    </div>
  );
};

export default AddTraining;