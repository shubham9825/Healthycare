import React from "react";
import Doctor from "../../Assets/Images/drgp.jpg";
import SolutionStep from "../Common/SolutionStep.jsx";
import "../../Assets/Styles/About.css";

const solutions = [
  {
    title: "Choose a Specialist",
    description:
      "Find your perfect specialist and book with ease at HealthCare Life. Expert doctors prioritize your health, offering tailored care.",
  },
  {
    title: "Make a Schedule",
    description:
      "Choose the date and time that suits you best, and let our dedicated team of medical professionals ensure your well-being with personalized care.",
  },
  {
    title: "Get Your Solutions",
    description:
      "Our experienced doctors and specialists are here to provide expert advice and personalized treatment plans, helping you achieve your best possible health.",
  },
];

export const About = () => {
  return (
    <div className="about-section" id="About">
      <div className="about-image-content">
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
          Welcome to HealthCare Life, your trusted partner for accessible and
          personalized healthcare. Our expert doctors offer online consultations
          and specialized services, prioritizing your well-being. Join us on
          this journey towards a healthier you.
        </p>

        <h4 className="about-text-title">Your Solutions</h4>

        {solutions.map((data, i) => (
          <SolutionStep
            key={i}
            title={data.title}
            description={data.description}
          />
        ))}
      </div>
    </div>
  );
};
