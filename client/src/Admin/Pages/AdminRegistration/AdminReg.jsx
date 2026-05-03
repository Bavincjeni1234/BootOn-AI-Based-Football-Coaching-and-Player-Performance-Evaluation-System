import React, { useState, useEffect } from "react";
import styles from "./AdminReg.module.css";
import axios from "axios";

const AdminReg = () => {
  const [admin_name, setAdminName] = useState("");
  const [admin_email, setAdminEmail] = useState("");
  const [admin_password, setAdminPassword] = useState("");
  const [adminData, setAdminData] = useState([]);

  // ✅ EDIT STATES (like District)
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  // SAVE / UPDATE
  const handleSave = () => {
    if (editId) {
      // UPDATE
      axios
        .put(`http://127.0.0.1:8000/EditAdmin/${editId}/`, {
          name: editName,
          email: editEmail,
          password: editPassword,
        })
        .then((res) => {
          cancelEdit();
          handleFetch();
        })
        .catch(console.error);
    } else {
      // INSERT
      const formData = new FormData();
      formData.append("txt_name", admin_name);
      formData.append("txt_email", admin_email);
      formData.append("txt_password", admin_password);

      axios
        .post("http://127.0.0.1:8000/admin/", formData)
        .then((res) => {
          alert(res.data.message);
          setAdminName("");
          setAdminEmail("");
          setAdminPassword("");
          handleFetch();
        })
        .catch(console.error);
    }
  };

  // FETCH
  const handleFetch = () => {
    axios
      .get("http://127.0.0.1:8000/admin/")
      .then((res) => setAdminData(res.data.admin))
      .catch(console.error);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  // DELETE
  const handleDelete = (aid) => {
    axios
      .delete(`http://127.0.0.1:8000/DeleteAdmin/${aid}/`)
      .then((res) => {
        alert(res.data.msg);
        handleFetch();
      })
      .catch(console.error);
  };

  // EDIT (like District)
  const startEdit = (item) => {
    setEditId(item.id);
    setEditName(item.admin_name);
    setEditEmail(item.admin_email);
    setEditPassword(item.admin_password);
  };

  const cancelEdit = () => {
    setEditId(null);  
    setEditName("");
    setEditEmail("");
    setEditPassword("");
  };

  return (
    <div className={styles.adminreg}>
      <center>
        <table className={styles.regtable}>
          <tbody>
            <tr>
              <td colSpan="3" align="center">
                <h2>Registration</h2>
              </td>
            </tr>

            <tr>
              <td>
                {editId ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Edit Name"
                  />
                ) : (
                  <input
                    value={admin_name}
                    onChange={(e) => setAdminName(e.target.value)}
                    placeholder="Enter Name"
                  />
                )}
              </td>

              <td>
                {editId ? (
                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="Edit Email"
                  />
                ) : (
                  <input
                    value={admin_email}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="Enter Email"
                  />
                )}
              </td>

              <td>
                {editId ? (
                  <input
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    placeholder="Edit Password"
                  />
                ) : (
                  <input
                    value={admin_password}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter Password"
                  />
                )}
              </td>
            </tr>

            <tr>
              <td colSpan="3" align="center">
                <button onClick={handleSave}>
                  {editId ? "Update" : "Submit"}
                </button>
                {editId && (
                  <button onClick={cancelEdit} style={{ marginLeft: 5 }}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <br />

        <table border="1" width="80%">
          <thead>
            <tr>
              <th>SI NO</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PASSWORD</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {adminData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.admin_name}</td>
                <td>{item.admin_email}</td>
                <td>{item.admin_password}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                  <button onClick={() => startEdit(item)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </div>
  );
};

export default AdminReg;
