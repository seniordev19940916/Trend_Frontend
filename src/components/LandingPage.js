import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./LandingPage.css";
import Login from "./Login";
import Logout from "./Logout";
import App from "./App";

function LandingPage() {
  return (
    <div className="landingPage-container">
      <Router>
        <nav>
          <Link className="linkStyle" to="/">
            About
          </Link>
          <Link className="linkStyle" to="/Contacts">
            Contacts
          </Link>
          <Login />
          <Logout />
        </nav>
        <Routes>
          <Route path="/app" element={<App />} />
        </Routes>
      </Router>
    </div>
  );
}

export default LandingPage;
