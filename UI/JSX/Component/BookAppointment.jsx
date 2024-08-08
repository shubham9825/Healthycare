import React from "react";
import Doctor from "../../Assets/Images/doctor-1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../../Assets/Styles/BookAppointment.css";

export const BookAppointment = () => {
  const navigate = useNavigate();

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  const healthDetails = [
    "Best Professional Doctors",
    "Emergency Care",
    "24/7 Support Live Chat",
    "Enrollment Easy and Quick",
  ];

  return (
    <div className="ba-section">
      <div className="ba-image-content">
        <img src={Doctor} alt="Doctor Group" className="ba-image1" />
      </div>

      <div className="ba-text-content">
        <h3 className="ba-title">
          <span>Why Choose Health</span>
        </h3>
        <p className="ba-description">
          Discover the reasons to choose HealthCare Life for your healthcare
          needs. Experience expert care, convenience, and personalized
          solutions, making your well-being our top priority. Join us on a
          journey to better health and a happier life.
        </p>

        {healthDetails.map((data, i) => (
          <p className="ba-checks ba-check-first" key={i}>
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ color: "#005e63" }}
            />{" "}
            {data}
          </p>
        ))}

        <button
          className="text-appointment-btn"
          type="button"
          onClick={handleBookAppointmentClick}
        >
          <FontAwesomeIcon icon={faCalendarCheck} /> Book Appointment
        </button>
      </div>
    </div>
  );
};
