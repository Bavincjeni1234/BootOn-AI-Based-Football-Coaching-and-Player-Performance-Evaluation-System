import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./VerifyCoach.module.css";

const VerifyCoach = () => {

  const [coachData, setCoachData] = useState([]);

  const playerId = sessionStorage.getItem("pid");

  // 🔥 Fetch coaches
  const fetchCoaches = () => {

    if (!playerId) {
      alert("Player not logged in");
      return;
    }

    axios.get(`http://127.0.0.1:8000/CoachListForPlayer/${playerId}/`)
      .then((res) => {
        setCoachData(res.data.coach || []);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load coaches");
      });
  };

  useEffect(() => {
    fetchCoaches();
  }, []);

  // 🔥 Send request
  const handleRequest = (coachId) => {

    if (!playerId) {
      alert("Player not logged in");
      return;
    }

    const formData = new FormData();
    formData.append("player_id", playerId);
    formData.append("coach_id", coachId);

    axios.post("http://127.0.0.1:8000/send_request/", formData)
      .then((res) => {
        alert(res.data.message);
        fetchCoaches(); // refresh
      })
      .catch((err) => {
        console.error(err);
        alert("Error sending request");
      });
  };

  return (
    <div className={styles.page}>

      <h2 className={styles.title}>Available Coaches</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.coachTable}>

          <thead>
            <tr>
              <th>SI NO</th>
              <th>Name</th>
              <th>Email</th>
              <th>Qualification</th>
              <th>Contact</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {coachData.length > 0 ? (
              coachData.map((item, index) => (
                <tr key={item.id}>

                  <td>{index + 1}</td>
                  <td>{item.coach_name}</td>
                  <td>{item.coach_email}</td>
                  <td>{item.coach_qualification}</td>
                  <td>{item.coach_contact}</td>

                  {/* ⭐ Rating */}
                  <td>
                    <span className={styles.rating}>
                      ⭐ {item.avg_rating || 0}
                    </span>
                  </td>

                  {/* 🔥 Action */}
                  <td>

                    {/* NOT REQUESTED */}
                    {item.request_status === null && (
                      <button
                        className={styles.requestBtn}
                        onClick={() => handleRequest(item.id)}
                      >
                        Request
                      </button>
                    )}

                    {/* PENDING */}
                    {item.request_status === "0" && (
                      <span className={styles.pending}>Pending</span>
                    )}

                    {/* ACCEPTED */}
                    {item.request_status === "1" && (
                      <span className={styles.accepted}>Accepted</span>
                    )}

                    {/* REJECTED (NO RE-REQUEST) */}
                    {item.request_status === "2" && (
                      <span className={styles.rejected}>Rejected</span>
                    )}

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No Coaches Available</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default VerifyCoach;