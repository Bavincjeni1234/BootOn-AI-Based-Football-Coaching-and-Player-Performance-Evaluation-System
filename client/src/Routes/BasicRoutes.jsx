import React from "react";  
   
import { Route,Routes } from "react-router";
import UseStateHook from "../Basics/Pages/UseStateHook/UseStateHook";
import UseEffectHook from "../Basics/Pages/UseEffectHook/UseEffectHook";
const BasicRoutes = () => {
    return (
        <>
            <div>
                <Routes>
                <Route path='usestatehook' element={<UseStateHook/>}></Route>
                <Route path='useeffecthook' element={<UseEffectHook/>}></Route>
                </Routes>
            </div>
        </>
    )
}
export default BasicRoutes;
