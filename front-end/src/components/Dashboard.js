import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./LandingPage.css";
// import Login from "./Login";
// import Logout from "./Logout";
import SmoothScroll from "smooth-scroll";
// import Profile from "./profile";
// import App from "./App";
import JsonData from "../data/data.json";
import { Navigation } from "../landingComponent/navigation";
import { Header } from "../landingComponent/header";
import { Features } from "../landingComponent/features";
import { About } from "../landingComponent/about";
import { Services } from "../landingComponent/services";
import { Gallery } from "../landingComponent/gallery";
import { Testimonials } from "../landingComponent/testimonials";
import { Team } from "../landingComponent/Team";
import { Contact } from "../landingComponent/contact";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

function Dashborad() {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  return (
    <div>
      <Navigation />
      <Header data={landingPageData.Header} />
      <Features data={landingPageData.Features} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Gallery data={landingPageData.Gallery} />
      <Testimonials data={landingPageData.Testimonials} />
      <Team data={landingPageData.Team} />
      <Contact data={landingPageData.Contact} />
    </div>
  );
}

export default Dashborad;
