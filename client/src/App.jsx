import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoachRoutes from "./Routes/CoachRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/coach/*" element={<CoachRoutes />} />  {/* ✅ change this */}
      </Routes>
    </Router>
  );
}