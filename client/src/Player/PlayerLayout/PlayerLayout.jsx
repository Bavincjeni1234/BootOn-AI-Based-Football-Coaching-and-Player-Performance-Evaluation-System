import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import PlayerRoutes from "../../Routes/PlayerRoutes";
import styles from "./Player.module.css";

const PlayerLayout = () => {
    return (
        <div className={styles.layout}>

            <Sidebar />

            <div className={styles.main}>

                <Navbar />

                <div className={styles.content}>
                    <PlayerRoutes />
                </div>

            </div>

        </div>
    )
}

export default PlayerLayout;