import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./viewcomplaint.module.css";

const AdminComplaint = () => {

  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const loadComplaints = () => {
    axios.get("http://127.0.0.1:8000/AdminComplaint/")
      .then((res) => setComplaints(res.data.complaints))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadComplaints();
  }, [location]);

  const replyComplaint = (id) => {
    navigate(`/admin/reply/${id}`);
  };

  return (

    <div className={styles.complaintsPage}>

      <h2 className={styles.title}>Player Complaints</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>

          <thead>
            <tr>
              <th>SI NO</th>
              <th>Player Details</th>
              <th>Title</th>
              <th>Content</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {complaints.length > 0 ? (
              complaints.map((item, index) => (
                <tr key={item.id}>

                  <td>{index + 1}</td>

                  <td>
                    <div className={styles.playerDetails}>
                      <span className={styles.playerName}>{item.player_name}</span>
                      <span className={styles.playerEmail}>{item.player_email}</span>
                    </div>
                  </td>

                  <td>
                    <span className={styles.complaintTitle}>{item.complaint_title}</span>
                  </td>

                  <td>
                    <span className={styles.complaintContent}>{item.complaint_content}</span>
                  </td>

                  <td>
                    {item.complaint_status === "0" ? (
                      <button
                        className={styles.replyBtn}
                        onClick={() => replyComplaint(item.id)}
                      >
                        Reply
                      </button>
                    ) : (
                      <span className={styles.repliedBadge}>Replied</span>
                    )}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Complaints</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>

  );

};

export default AdminComplaint;
