import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import SmoothScroll from "smooth-scroll";
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
import "./Login.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {isAuthenticated ? (
        <button style={{ color: "#c28585" }} onClick={() => logout()}>
          Log out
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()} className="login-button">
          <text className="btn">Log In</text>
        </button>
      )}
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
};

export default Login;
