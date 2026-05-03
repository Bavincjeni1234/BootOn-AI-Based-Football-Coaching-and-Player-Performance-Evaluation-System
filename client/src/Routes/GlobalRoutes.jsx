import React from "react";
import { Route,Routes} from "react-router";
import GuestLayout from "../Guest/GuestLayout/GuestLayout.jsx";
import BasicLayout from "../Basics/BasicLayout/BasicLayout.jsx";
import AdminLayout from "../Admin/AdminLayout/AdminLayout.jsx";
import PlayerLayout from "../Player/PlayerLayout/PlayerLayout.jsx";
import CoachLayout from "../Coach/CoachLayout/CoachLayout.jsx";

const GlobalRoutes = () => {
    return (    
        <Routes>
             <Route path="coach/*" element={<CoachLayout/>}></Route>
            <Route path="guest/*" element={<GuestLayout/>}></Route>
            <Route path="basics/*" element={<BasicLayout/>}></Route>
            <Route path="player/*" element={<PlayerLayout/>}></Route>
            <Route path="admin/*" element={<AdminLayout/>}></Route>
            <Route path="adminreg/*" element={<AdminLayout/>}></Route>
        </Routes>
    )
}
export default GlobalRoutes;