import React from "react";
import { Route, Routes } from "react-router";

/* Existing Pages */
import AdminReg from "../Admin/Pages/AdminRegistration/AdminReg";
import CoachReg from "../Admin/Pages/CoachReg/CoachReg";
import VerifyPlayer from "../Admin/Pages/VerifyPlayer/VerifyPlayer";
import Category from "../Admin/Pages/Category/Category";
import AdminDashboard from "../Admin/Pages/AdminDashboard/AdminDashboard";
import AdminComplaint from "../Admin/Pages/viewcomplaint/viewcomplaint";
import ComplaintReply from "../Admin/Pages/ComplaintReply/complaintreply";

/* NEW Profile Pages */
import MyProfile from "../Admin/Pages/MyProfile/MyProfile";
import EditProfile from "../Admin/Pages/EditProfile/EditProfile";
import ChangePassword from "../Admin/Pages/ChangePassword/ChangePassword";

const AdminRoutes = () => {
  return (
    <>
      <div>
        <Routes>

          {/* Dashboard */}
          <Route path="/" element={<AdminDashboard />} />

          {/* Registration */}
          <Route path="adminreg" element={<AdminReg />} />
          <Route path="coachreg" element={<CoachReg />} />

          {/* Management */}
          <Route path="category" element={<Category />} />
          <Route path="verifyplayer" element={<VerifyPlayer />} />

          {/* Complaints */}
          <Route path="complaints" element={<AdminComplaint />} />
          <Route path="reply/:cid" element={<ComplaintReply />} />

          {/* Profile Settings */}
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="editprofile" element={<EditProfile />} />
          <Route path="changepassword" element={<ChangePassword />} />

        </Routes>
      </div>
    </>
  );
};

export default AdminRoutes;