import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./MyTraining.module.css";

const MyTraining = () => {

  const [training, setTraining] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const playerId = sessionStorage.getItem("pid");
    if (!playerId) {
      alert("Player not logged in");
      return;
    }

    axios.get(`http://127.0.0.1:8000/PlayerTraining/${playerId}/`)
      .then((res) => setTraining(res.data.trainings))
      .catch((err) => {
        console.error(err);
        alert("Failed to load training");
      });
  }, []);

  const handleReport = (trainingId) => {
    navigate(`/player/report/${trainingId}`);
  };

  const handleChat = (coachId) => {
    navigate(`/player/chat/${coachId}`);
  };

  return (
    <div className={styles.trainingPage}>

      <h2 className={styles.title}>My Training Tasks</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.trainingTable}>

          <thead>
            <tr>
              <th>SI NO</th>
              <th>Details</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Assigned Date</th>
              <th>File</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {training.length > 0 ? (
              training.map((item, index) => (
                <tr key={item.training_id}>

                  <td>{index + 1}</td>
                  <td>{item.training_details}</td>
                  <td>{item.training_startdate}</td>
                  <td>{item.training_enddate}</td>
                  <td>{item.training_date}</td>

                  <td>
                    <a
                      className={styles.fileLink}
                      href={`http://127.0.0.1:8000${item.training_file}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View File
                    </a>
                  </td>

                  <td>
                    <div className={styles.actionCell}>

                      {item.report_status === "0" ? (
                        <button
                          className={styles.completeBtn}
                          onClick={() => handleReport(item.training_id)}
                        >
                          Complete Task
                        </button>
                      ) : (
                        <>
                          <button className={styles.completedBtn} disabled>
                            Completed
                          </button>

                          {/* ⭐ NAVIGATE TO FEEDBACK PAGE */}
                          <button
                            className={styles.rateBtn}
                            onClick={() => navigate(`/player/feedback/${item.coach_id}`)}
                          >
                            ⭐ Rate Coach
                          </button>
                        </>
                      )}

                      <button
                        className={styles.chatBtn}
                        onClick={() => handleChat(item.coach_id)}
                      >
                        Chat
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No Training Assigned</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default MyTraining;