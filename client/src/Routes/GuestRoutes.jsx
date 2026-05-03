import react from "react";
import Login from "../Guest/Pages/Login/Login";
import PlayerReg from "../Guest/Pages/PlayerReg/PlayerReg";
import { Route, Routes } from "react-router";
const GuestRoutes = () => {
    return (
        <>
            <div>
                <Routes>
                        <Route path="login" element={<Login/>}></Route>
                        <Route path="registration" element={<PlayerReg/>}></Route>
            
                 </Routes>
            </div>
        </>
    )
}
export default GuestRoutes;
