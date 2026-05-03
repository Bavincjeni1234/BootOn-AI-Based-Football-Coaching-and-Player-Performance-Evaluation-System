import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./AcceptedPlayers.module.css";

const AcceptedPlayers = () => {

  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const coachId = sessionStorage.getItem("cid");

  const fetchPlayers = () => {
    axios.get(`http://127.0.0.1:8000/AcceptedPlayers/${coachId}/`)
      .then((res) => setPlayers(res.data.players))
      .catch((err) => {
        console.error(err);
        alert("Failed to load accepted players");
      });
  };

  useEffect(() => {
    if (!coachId) {
      alert("Coach not logged in");
      return;
    }
    fetchPlayers();
  }, []);

  const handleAddTraining = (requestId) =>
    navigate(`/coach/addtraining/${requestId}`);

  const handleAddAttributes = (playerId) =>
    navigate(`/coach/addattributes/${playerId}`);

  const handleChat = (playerId) =>
    navigate(`/coach/chat/${playerId}`);

  const handleApprove = (reportId) => {
    axios.post(`http://127.0.0.1:8000/ApproveReport/${reportId}/`)
      .then(() => {
        alert("Report Approved");
        fetchPlayers();
      })
      .catch((err) => {
        console.error(err);
        alert("Error approving report");
      });
  };

  const StatusBadge = ({ status }) => {
    if (status === "Task Completed")
      return <span className={styles.completed}>Completed</span>;
    if (status === "Pending Review")
      return <span className={styles.review}>Pending Review</span>;
    return <span className={styles.pending}>Pending</span>;
  };

  return (
    <div className={styles.page}>

      <h2 className={styles.title}>Accepted Players</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>

          <thead>
            <tr>
              <th>SI NO</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Training</th>
              <th>Attributes</th>
              <th>Chat</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {players.length > 0 ? (
              players.map((item, index) => (
                <tr key={item.request_id}>

                  <td>{index + 1}</td>
                  <td>{item.player_name}</td>
                  <td>{item.player_email}</td>
                  <td>{item.player_position}</td>
                  <td>{item.player_height}</td>
                  <td>{item.player_weight}</td>
                  <td>{item.request_date}</td>

                  {/* ✅ CENTERED STATUS */}
                  <td className={styles.statusCell}>
                    <StatusBadge status={item.player_status} />
                  </td>

                  {/* TRAINING */}
                  <td>
                    <button
                      className={styles.trainingBtn}
                      onClick={() => handleAddTraining(item.request_id)}
                    >
                      Add Training
                    </button>
                  </td>

                  {/* ATTRIBUTES */}
                  <td>
                    <button
                      className={styles.trainingBtn}
                      onClick={() => handleAddAttributes(item.player_id)}
                    >
                      Add Attributes
                    </button>
                  </td>

                  {/* CHAT */}
                  <td>
                    <button
                      className={styles.chatBtn}
                      onClick={() => handleChat(item.player_id)}
                    >
                      Chat
                    </button>
                  </td>

                  {/* ✅ CLEAN ACTION COLUMN */}
                  <td className={styles.actionCell}>

                    {item.report_file && (
                      <a
                        href={`http://127.0.0.1:8000${item.report_file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewBtn}
                      >
                        View
                      </a>
                    )}

                    {item.player_status === "Pending Review" && (
                      <button
                        className={styles.approveBtn}
                        onClick={() => handleApprove(item.report_id)}
                      >
                        Approve
                      </button>
                    )}

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12">No Accepted Players</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default AcceptedPlayers;