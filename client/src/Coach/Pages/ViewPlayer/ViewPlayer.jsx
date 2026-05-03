import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ViewPlayer.module.css";

const ViewPlayer = () => {

  const [requestData, setRequestData] = useState([]);

  const fetchRequests = () => {
    const coachId = sessionStorage.getItem("cid");

    if (!coachId) {
      alert("Coach not logged in");
      return;
    }

    axios.get(`http://127.0.0.1:8000/CoachRequests/${coachId}/`)
      .then((res) => {
        setRequestData(res.data.requests);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load player requests");
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = (requestId) => {
    axios.put(`http://127.0.0.1:8000/AcceptRequest/${requestId}/`)
      .then((res) => {
        alert(res.data.message);
        fetchRequests();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to accept request");
      });
  };

  const handleReject = (requestId) => {
    axios.put(`http://127.0.0.1:8000/RejectRequest/${requestId}/`)
      .then((res) => {
        alert(res.data.message);
        fetchRequests();
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to reject request");
      });
  };

  return (
    <div className={styles.page}>

      <h2 className={styles.title}>Requested Players</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>

          <thead>
            <tr>
              <th>SI NO</th>
              <th>Name</th>
              <th>Email</th>
              <th>Category</th>
              <th>Position</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requestData.length > 0 ? (
              requestData.map((item, index) => (
                <tr key={item.request_id}>

                  <td>{index + 1}</td>
                  <td>{item.player_name}</td>
                  <td>{item.player_email}</td>
                  <td>{item.category}</td>
                  <td>{item.player_position}</td>
                  <td>{item.player_height}</td>
                  <td>{item.player_weight}</td>
                  <td>{item.request_date}</td>

                  <td>
                    {item.request_status === "1" && (
                      <span className={styles.statusAccepted}>Accepted</span>
                    )}
                    {item.request_status === "2" && (
                      <span className={styles.statusRejected}>Rejected</span>
                    )}
                    {item.request_status === "0" && (
                      <span className={styles.statusPending}>Pending</span>
                    )}
                  </td>

                  <td>
                    {item.request_status === "0" && (
                      <div className={styles.actionWrap}>
                        <button
                          className={styles.acceptBtn}
                          onClick={() => handleAccept(item.request_id)}
                        >
                          Accept
                        </button>

                        <button
                          className={styles.rejectBtn}
                          onClick={() => handleReject(item.request_id)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No Player Requests Found</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default ViewPlayer;