import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./VerifyPlayer.module.css";

export default function VerifyPlayer() {

  const [playerdata, setPlayerdata] = useState([]);

  const fetchplayer = () => {
    axios
      .get("http://127.0.0.1:8000/verifyplayer/")
      .then((res) => {
        setPlayerdata(res.data.player_list);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchplayer();
  }, []);

  const handle_verify = (id) => {
    axios
      .put(`http://127.0.0.1:8000/acceptplayers/${id}/`)
      .then(() => {
        fetchplayer();
      })
      .catch(console.error);
  };

  const handle_reject = (id) => {
    axios
      .put(`http://127.0.0.1:8000/rejectplayers/${id}/`)
      .then(() => {
        fetchplayer();
      })
      .catch(console.error);
  };

  return (
    <div className={styles.verifyContainer}>

      <h1 className={styles.title}>Verify Player ⚡</h1>

      <table className={styles.table}>

        <thead>
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Weight</th>
            <th>Height</th>
            <th>Strongfoot</th>
            <th>Position</th>
            <th>DOB</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {playerdata.length > 0 ? (
            playerdata.map((item, index) => (

              <tr key={item.id}>

                <td>{index + 1}</td>
                <td>{item.player_name}</td>
                <td>{item.player_email}</td>
                <td>{item.player_weight}</td>
                <td>{item.player_height}</td>
                <td>{item.player_strongfoot}</td>
                <td>{item.player_position}</td>
                <td>{item.player_dob}</td>

                {/* STATUS */}
                <td>
                  {item.player_status == 1
                    ? <span className={styles.accepted}>Accepted</span>
                    : item.player_status == 2
                    ? <span className={styles.rejected}>Rejected</span>
                    : <span className={styles.pending}>Pending</span>}
                </td>

                {/* ACTION */}
                <td>

                  {item.player_status == 0 && (
                    <>
                      <button
                        className={styles.verifyBtn}
                        onClick={() => handle_verify(item.id)}
                      >
                        Accept
                      </button>

                      <button
                        className={styles.rejectBtn}
                        onClick={() => handle_reject(item.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}

                </td>

              </tr>

            ))
          ) : (
            <tr>
              <td colSpan="10">No Players Found</td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}