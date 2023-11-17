import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./components/App";
import LandingPage from "./components/LandingPage";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import { Auth0Provider } from "@auth0/auth0-react";
// import Auth from "./routes/Auth";
//import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain="dev-2qz2wjgdc2owecxm.us.auth0.com"
        clientId="Cx0rKVgdTfUWmS1h3pciRWpoY5jvOWi5"
        redirectUri="https://trend-frontend.vercel.app/app"
      >
        {/* <App /> */}
        <LandingPage />
      </Auth0Provider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
