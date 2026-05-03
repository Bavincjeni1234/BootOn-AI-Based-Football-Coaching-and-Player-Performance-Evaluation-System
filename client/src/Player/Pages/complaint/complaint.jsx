import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Complaint.module.css";

const Complaint = () => {

  const playerId = sessionStorage.getItem("pid");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [complaints, setComplaints] = useState([]);

  const loadComplaints = () => {
    axios.get(`http://127.0.0.1:8000/PlayerComplaint/${playerId}/`)
      .then((res) => { setComplaints(res.data.complaints); })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const handleSubmit = () => {
    if (!title || !content) { alert("Enter all fields"); return; }

    const formData = new FormData();
    formData.append("complaint_title", title);
    formData.append("complaint_content", content);

    axios.post(`http://127.0.0.1:8000/SendComplaint/${playerId}/`, formData)
      .then((res) => {
        alert(res.data.message);
        setTitle("");
        setContent("");
        loadComplaints();
      })
      .catch((err) => { console.log(err); });
  };

  const deleteComplaint = (id) => {
    if (!window.confirm("Delete this complaint?")) return;

    axios.get(`http://127.0.0.1:8000/DeleteComplaint/${id}/`)
      .then((res) => { alert(res.data.message); loadComplaints(); })
      .catch((err) => { console.log(err); });
  };

  return (

    <div className={styles.page}>

      {/* ── Form Section ── */}
      <h2 className={styles.title}>Send Complaint</h2>

      <table className={styles.formCard}>
        <tbody>

          <tr>
            <td>Title</td>
            <td>
              <input
                type="text"
                placeholder="Brief complaint title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td>Content</td>
            <td>
              <textarea
                placeholder="Describe your complaint in detail..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <button className={styles.submitBtn} onClick={handleSubmit}>
                Submit Complaint
              </button>
            </td>
          </tr>

        </tbody>
      </table>

      {/* ── Data Table Section ── */}
      <h2 className={styles.subTitle}>My Complaints</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.dataTable}>

          <thead>
            <tr>
              <th>SI NO</th>
              <th>Title</th>
              <th>Content</th>
              <th>Reply</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {complaints && complaints.length > 0 ? (
              complaints.map((item, index) => (
                <tr key={item.id}>

                  <td>{index + 1}</td>
                  <td>{item.complaint_title}</td>
                  <td>{item.complaint_content}</td>

                  <td>
                    {item.complaint_reply ? (
                      <span className={styles.replied}>{item.complaint_reply}</span>
                    ) : (
                      <span className={styles.waiting}>Waiting</span>
                    )}
                  </td>

                  <td>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteComplaint(item.id)}
                    >
                      Delete
                    </button>
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

export default Complaint;