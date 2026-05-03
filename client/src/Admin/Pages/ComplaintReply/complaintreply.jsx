import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ComplaintReply.module.css";

const ComplaintReply = () => {

  const { cid } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [reply, setReply] = useState("");

  // Load complaint details
  useEffect(() => {

    axios.get(`http://127.0.0.1:8000/ComplaintSingle/${cid}/`)
      .then((res) => {
        setTitle(res.data.complaint_title);
        setContent(res.data.complaint_content);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [cid]);


  // Send reply
  const sendReply = () => {

    if (!reply) {
      alert("Enter reply");
      return;
    }

    const formData = new FormData();
    formData.append("reply", reply);

    axios.post(`http://127.0.0.1:8000/SendReply/${cid}/`, formData)
      .then((res) => {
        alert(res.data.message);
        navigate("/admin/complaints");
      })
      .catch((err) => {
        console.log(err);
      });

  };

  return (

    <div className={styles.replyPage}>

      <h2 className={styles.title}>Reply Complaint</h2>

      <table className={styles.replyTable}>

        <tbody>

          <tr>
            <td>Title</td>
            <td>{title}</td>
          </tr>

          <tr>
            <td>Content</td>
            <td>{content}</td>
          </tr>

          <tr>
            <td>Reply</td>
            <td>
              <textarea
                placeholder="Type your reply here..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            </td>
          </tr>

          <tr>
            <td colSpan="2">
              <button
                className={styles.submitBtn}
                onClick={sendReply}
              >
                Submit Reply
              </button>
            </td>
          </tr>

        </tbody>

      </table>

    </div>

  );

};

export default ComplaintReply;