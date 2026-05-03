import React from "react";
import styles from "./AdminLayout.module.css";
import AdminRoutes from "../../Routes/AdminRoutes";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";

const AdminLayout = () => {
    return (
        <div className={styles.layout}>

            <Sidebar />

            <div className={styles.main}>
                <Navbar />
                <div className={styles.content}>
                    <AdminRoutes />
                </div>
            </div>

        </div>
    );
};

export default AdminLayout;