import React from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={styles.userside}>

            <div className={styles.brand}></div>

            <div className={styles.menu}>

                <Link to="/player/myprofile">My Profile</Link>
                <Link to="/player/editprofile">Edit Profile</Link>
                <Link to="/player/changepassword">Change Password</Link>

                <hr className={styles.divider} />

                <Link to="/player/verifycoach">Verify Coach</Link>
                <Link to="/player/mytraining">My Training</Link>
                <Link to="/player/notification">Notification</Link>
                <Link to="/player/complaint">Complaint</Link>

            </div>

        </div>
    )
}

export default Sidebar;