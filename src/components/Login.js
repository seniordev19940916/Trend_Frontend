import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {isAuthenticated ? (
        <button style={{ color: "#c28585" }} onClick={() => logout()}>
          Log out
        </button>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      )}
    </div>
  );
};

export default Login;
