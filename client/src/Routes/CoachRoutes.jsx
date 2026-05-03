import React from "react";
import { Routes, Route } from "react-router-dom";

// ✅ ADD THIS
import CoachDashboard from "../Coach/Pages/CoachDashboard/CoachDashboard";

import AcceptedPlayers from "../Coach/Pages/AcceptedPlayers/AcceptedPlayers";
import ViewPlayer from "../Coach/Pages/ViewPlayer/ViewPlayer";
import Notification from "../Coach/Pages/Notification/Notification";
import EditProfile from "../Coach/Pages/Editprofile/editprofile";
import MyProfile from "../Coach/Pages/MyProfile/MyProfile";
import ChangePassword from "../Coach/Pages/ChangePassword/ChangePassword";
import AddTraining from "../Coach/Pages/AddTraining/AddTraining";
import AddAttributes from "../Coach/Pages/AddAttributes/AddAttributes";
import Coachchat from "../Coach/Pages/Coachchat/Coachchat";

const CoachRoutes = () => {
  return (
    <Routes>

      {/* ✅ DEFAULT PAGE → DASHBOARD */}
      <Route index element={<CoachDashboard />} />

      <Route path="acceptedplayers" element={<AcceptedPlayers />} />
      <Route path="viewplayers" element={<ViewPlayer />} />
      <Route path="notification" element={<Notification />} />
      <Route path="editprofile" element={<EditProfile />} />
      <Route path="myprofile" element={<MyProfile />} />
      <Route path="changepassword" element={<ChangePassword />} />
      <Route path="addtraining/:id" element={<AddTraining />} />
      <Route path="addattributes/:id" element={<AddAttributes />} />
      <Route path="chat/:id" element={<Coachchat />} />

    </Routes>
  );
};

export default CoachRoutes;