import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import SmoothScroll from "smooth-scroll";
import "./Login.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <button className="login-button" onClick={() => logout()}>
          <text className="btn">Log out</text>
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()} className="login-button">
          <text className="btn">Log In</text>
        </button>
      )}
    </div>
  );
};

export default Login;
