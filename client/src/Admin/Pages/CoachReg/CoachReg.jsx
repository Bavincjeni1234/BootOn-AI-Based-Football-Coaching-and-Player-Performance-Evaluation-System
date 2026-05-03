import React, { useState, useEffect } from "react";
import styles from "./CoachReg.module.css";
import axios from "axios";

const Coach = () => {

  const [name,          setName]          = useState("");
  const [email,         setEmail]         = useState("");
  const [password,      setPassword]      = useState("");
  const [photo,         setPhoto]         = useState(null);
  const [proof,         setProof]         = useState(null);
  const [qualification, setQualification] = useState("");
  const [contact,       setContact]       = useState("");
  const [coachData,     setCoachData]     = useState([]);

  const [editId,            setEditId]            = useState(null);
  const [editName,          setEditName]          = useState("");
  const [editEmail,         setEditEmail]         = useState("");
  const [editPassword,      setEditPassword]      = useState("");
  const [editQualification, setEditQualification] = useState("");
  const [editContact,       setEditContact]       = useState("");

  const handleFetch = () => {
    axios.get("http://127.0.0.1:8000/coach/")
      .then((res) => setCoachData(res.data.coach))
      .catch(console.error);
  };

  useEffect(() => { handleFetch(); }, []);

  const clearForm = () => {
    setName(""); setEmail(""); setPassword("");
    setQualification(""); setContact("");
    setPhoto(null); setProof(null);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName(""); setEditEmail(""); setEditPassword("");
    setEditQualification(""); setEditContact("");
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditName(item.coach_name);
    setEditEmail(item.coach_email);
    setEditPassword(item.coach_password);
    setEditQualification(item.coach_qualification);
    setEditContact(item.coach_contact);
  };

  const handleSave = () => {
    const formData = new FormData();

    if (editId) {
      formData.append("txt_name",          editName);
      formData.append("txt_email",         editEmail);
      formData.append("txt_password",      editPassword);
      formData.append("txt_qualification", editQualification);
      formData.append("txt_contact",       editContact);

      axios.post(`http://127.0.0.1:8000/Editcoach/${editId}/`, formData)
        .then(() => { alert("Updated Successfully"); cancelEdit(); handleFetch(); })
        .catch(console.error);
    } else {
      formData.append("txt_name",          name);
      formData.append("txt_email",         email);
      formData.append("txt_password",      password);
      formData.append("txt_qualification", qualification);
      formData.append("txt_contact",       contact);
      if (photo) formData.append("txt_photo", photo);
      if (proof) formData.append("txt_proof", proof);

      axios.post("http://127.0.0.1:8000/coach/", formData)
        .then((res) => { alert(res.data.message); clearForm(); handleFetch(); })
        .catch(console.error);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/DeleteCoach/${id}/`)
      .then((res) => { alert(res.data.msg); handleFetch(); })
      .catch(console.error);
  };

  const val  = (insert, edit) => editId ? edit : insert;
  const set  = (insertFn, editFn) => (e) => editId ? editFn(e.target.value) : insertFn(e.target.value);

  return (
    <div className={styles.formContainer}>

      {/* ── Registration Card ── */}
      <div className={styles.card}>

        {/* card top strip via ::before */}

        <div className={styles.cardHeader}>
          <span className={styles.eyebrow}>Admin Panel</span>
          <h2 className={styles.title}>
            {editId ? "Edit Coach" : "Coach Registration"}
          </h2>
        </div>

        <div className={styles.cardBody}>

          {/* Row 1: Name + Email */}
          <div className={styles.fieldGrid}>
            <div className={styles.field}>
              <label>Full Name</label>
              <input
                type="text"
                autoComplete="off"
                placeholder="Coach name"
                value={val(name, editName)}
                onChange={set(setName, setEditName)}
              />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                autoComplete="off"
                placeholder="coach@example.com"
                value={val(email, editEmail)}
                onChange={set(setEmail, setEditEmail)}
              />
            </div>
          </div>

          {/* Row 2: Password + Contact */}
          <div className={styles.fieldGrid}>
            <div className={styles.field}>
              <label>Password</label>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="Create password"
                value={val(password, editPassword)}
                onChange={set(setPassword, setEditPassword)}
              />
            </div>
            <div className={styles.field}>
              <label>Contact</label>
              <input
                type="tel"
                autoComplete="off"
                placeholder="+91 00000 00000"
                value={val(contact, editContact)}
                onChange={set(setContact, setEditContact)}
              />
            </div>
          </div>

          {/* Qualification full width */}
          <div className={styles.field}>
            <label>Qualification</label>
            <input
              type="text"
              autoComplete="off"
              placeholder="e.g. UEFA A Licence"
              value={val(qualification, editQualification)}
              onChange={set(setQualification, setEditQualification)}
            />
          </div>

          {/* File uploads — only on insert */}
          {!editId && (
            <>
              <div className={styles.divider} />
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label>Photo</label>
                  <input type="file" accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])} />
                </div>
                <div className={styles.field}>
                  <label>ID Proof</label>
                  <input type="file"
                    onChange={(e) => setProof(e.target.files[0])} />
                </div>
              </div>
            </>
          )}

          {/* Actions */}
          <div className={styles.formActions}>
            <button className={styles.submitBtn} onClick={handleSave}>
              {editId ? "Update Coach" : "Register Coach"}
            </button>
            {editId && (
              <button className={styles.cancelBtn} onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ── Data Table ── */}
      <div className={styles.tableWrapper}>
        <table className={styles.dataTable}>
          <thead>
            <tr>
              <th>SI NO</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Qualification</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coachData.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.coach_name}</td>
                <td>{item.coach_email}</td>
                <td>••••••••</td>
                <td>{item.coach_qualification}</td>
                <td>{item.coach_contact}</td>
                <td>
                  <div className={styles.actionCell}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(item.id)}
                    >Delete</button>
                    <button
                      className={styles.editBtn}
                      onClick={() => startEdit(item)}
                    >Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Coach;