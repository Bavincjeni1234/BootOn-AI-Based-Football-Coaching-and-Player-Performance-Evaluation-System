import React from "react";
import { Route, Routes } from "react-router-dom";

/* Dashboard */
import PlayerDashboard from "../Player/Pages/PlayerDashboard/PlayerDashboard";

import EditProfile from "../Player/Pages/EditProfile/EditProfile";
import Myprofile from "../Player/Pages/MyProfile/MyProfile";
import ChangePassword from "../Player/Pages/ChangePassword/ChangePassword";
import VerifyCoach from "../Player/Pages/VerifyCoach/VerifyCoach";
import MyTraining from "../Player/Pages/MyTraining/MyTraining";
import Report from "../Player/Pages/Report/Report";
import Notification from "../Player/Pages/PlayerNotification/PlayerNotification";
import Playerchat from "../Player/Pages/Playerchat/Playerchat";
import Complaint from "../Player/Pages/complaint/complaint";
import PlayerFeedback from "../Player/Pages/Feedback/PlayerFeedback";

const PlayerRoutes = () => {

    return (

        <Routes>

            {/* ✅ DEFAULT DASHBOARD */}
            <Route path="/" element={<PlayerDashboard />} />
            <Route path="dashboard" element={<PlayerDashboard />} />

            <Route path="editprofile" element={<EditProfile />} />
            <Route path="myprofile" element={<Myprofile />} />
            <Route path="changepassword" element={<ChangePassword />} />

            <Route path="verifycoach" element={<VerifyCoach />} />
            <Route path="mytraining" element={<MyTraining />} />

            <Route path="report/:trainingId" element={<Report />} />

            <Route path="notification" element={<Notification />} />

            {/* CHAT */}
            <Route path="chat/:cid" element={<Playerchat />} />

            {/* COMPLAINT */}
            <Route path="complaint" element={<Complaint />} />

            {/* FEEDBACK */}
            <Route path="feedback/:coachId" element={<PlayerFeedback />} />

        </Routes>

    );

};

export default PlayerRoutes;