import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const InformationCard = ({ icon, title, description }) => {
  return (
    <div className="info-cards">
      <span className="info-card-icon">
        <FontAwesomeIcon className="info-fa-icon" icon={icon} />
      </span>
      <p className="info-card-title">{title}</p>
      <p className="info-card-description">{description}</p>
    </div>
  );
};
