import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./LandingPage.css";
import Login from "./Login";
import Logout from "./Logout";
import Dashborad from "./Dashboard";
// import Profile from "./profile";
import App from "./App";

function LandingPage() {
  return (
    <div className="landingPage-container">
      <Router>
        <Routes>
          <Route path="/" element={<Dashborad />}></Route>
          <Route path="/app" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashborad" element={<Dashborad />}></Route>
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default LandingPage;
