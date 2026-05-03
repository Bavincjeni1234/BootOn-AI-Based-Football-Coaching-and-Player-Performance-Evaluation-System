import React from "react";
import styles from "./Sidebar.module.css";
import { Link } from "react-router";

const Sidebar = () => {
    return (
        <div className={styles.sidebarmain}>

             <div><Link to='/admin/adminreg'>Admin Registration</Link></div>
             <div><Link to='/admin/coachreg'>Coach Registration</Link></div>
             <div><Link to='/admin/category'>Category</Link></div>

             {/* Divider */}
             <hr/>

             <div><Link to='/admin/verifyplayer'>Verify Player</Link></div>
             <div><Link to='/admin/complaints'>Complaints</Link></div>

             {/* Profile Section */}
             <hr/>

             <div><Link to='/admin/myprofile'>My Profile</Link></div>
             <div><Link to='/admin/editprofile'>Edit Profile</Link></div>
             <div><Link to='/admin/changepassword'>Change Password</Link></div>

        </div>
    )
}

export default Sidebar;