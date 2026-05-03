import React, { useState } from "react";
import axios from "axios";
import styles from "./ChangePassword.module.css";

const ChangePassword = () => {

    const pid = sessionStorage.getItem("pid");

    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            alert("New passwords do not match");
            return;
        }

        axios.post(`http://127.0.0.1:8000/ChangePlayerPassword/${pid}/`, form)
            .then((res) => {
                alert(res.data.message);
                setForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

    return (
        <div className={styles.changePassword}>
            <div className={styles.card}>
                <h2>Change Password</h2>

                <form onSubmit={handleSubmit}>

                    <label>Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                        required
                    />

                    <label>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        required
                    />

                    <label>Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Update Password
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ChangePassword;