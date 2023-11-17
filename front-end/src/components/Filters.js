import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Dropdown from "./Dropdown";
import "./Filters.css";

const Filters = ({ platform, location, locations, editFilter }) => {
  const platformData = {
    google_trends: {
      icon: faGoogle,
      desc: "The data below displays search terms that jumped significantly in traffic over the past 24 hours.",
    },
  };

  return (
    <div className="Filters">
      <div>
        <FontAwesomeIcon
          className="fa-icon"
          icon={platformData[platform].icon}
          size="2x"
        />
        <Dropdown
          label="platform"
          value={platform}
          options={["Google Trends"]}
          onChange={editFilter}
        />
        <Dropdown
          label="location"
          value={location}
          options={locations}
          onChange={editFilter}
        />
        <img src={require(`../img/flags/${location}.png`)} alt={location} />
      </div>
      <p>{platformData[platform].desc}</p>
    </div>
  );
};

export default Filters;
