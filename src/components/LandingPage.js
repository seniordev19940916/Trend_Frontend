import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./LandingPage.css";
import Login from "./Login";
import Logout from "./Logout";

function LandingPage() {
  return (
    <div className="landingPage-container">
      <Login />
      <Logout />
    </div>
  );
}

export default LandingPage;
