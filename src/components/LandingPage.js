import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./LandingPage.css";
import Login from "./Login";
import Logout from "./Logout";
import Profile from "./profile";
import App from "./App";

function LandingPage() {
  return (
    <div className="landingPage-container">
      <Router>
        <nav>
          {/* <Link className="linkStyle" to="/About">
            About
          </Link>
          <Link className="linkStyle" to="/Contacts">
            Contacts
          </Link> */}
          <Login />
          <Logout />
          <Profile />
        </nav>
        <Routes>
          <Route path="/app" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default LandingPage;
