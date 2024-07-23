import React from "react";
import { InformationCard } from "../Common/InformationCard.jsx";
import {
  faHeartPulse,
  faTruckMedical,
  faTooth,
} from "@fortawesome/free-solid-svg-icons";
import "../../Assets/Styles/Info.css";

const cardDetails = [
  {
    title: "Emergency Care",
    description: `Our Emergency Care service is designed to be your reliable support
  in critical situations. Whether it's a sudden illness, injury, or
  any medical concern that requires immediate attention, our team of
  dedicated healthcare professionals is available 24/7 to provide
  prompt and efficient care.`,
    icon: faTruckMedical,
  },
  {
    title: "Heart Disease",
    description: `Our team of experienced cardiologists and medical experts use
            state-of-the-art technology to assess your cardiovascular health and
            design personalized treatment plans. From comprehensive screenings
            to advanced interventions, we are committed to helping you maintain
            a healthy heart and lead a fulfilling life.`,
    icon: faHeartPulse,
  },
  {
    title: "Dental Care",
    description: `Smile with confidence as our Dental Care services cater to all your
            oral health needs. Our skilled dentists provide a wide range of
            treatments, from routine check-ups and cleanings to cosmetic
            procedures and restorative treatments.`,
    icon: faTooth,
  },
];

export const Info = () => {
  return (
    <div className="info-section" id="Services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
          We bring healthcare to your convenience, offering a comprehensive
          range of on-demand medical services tailored to your needs. Our
          platform allows you to connect with experienced online doctors who
          provide expert medical advice, issue online prescriptions, and offer
          quick refills whenever you require them.
        </p>
      </div>

      <div className="info-cards-content">
        {cardDetails.map((data, i) => (
          <InformationCard
            key={i}
            title={data.title}
            description={data.description}
            icon={data.icon}
          />
        ))}
      </div>
    </div>
  );
};
