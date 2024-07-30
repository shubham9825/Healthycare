import React from "react";
import { DoctorCard } from "../Common/DoctorCard.jsx";
import profile1 from "../../Assets/Images/profile-1.png";
import profile2 from "../../Assets/Images/profile-2.png";
import profile3 from "../../Assets/Images/profile-3.png";
import profile4 from "../../Assets/Images/profile-4.png";
import "../../Assets/Styles/Doctors.css";

const doctorDetails = [
  {
    img: profile1,
    name: "Dr. Kathryn Murphy",
    title: "General Surgeons",
    stars: "4.9",
    reviews: "1800",
  },
  {
    img: profile2,
    name: "Dr. Jacob Jones",
    title: "Hematologists",
    stars: "4.8",
    reviews: "700",
  },
  {
    img: profile3,
    name: "Dr. John Wilson",
    title: "Endocrinologists",
    stars: "4.7",
    reviews: "450",
  },
  {
    img: profile4,
    name: "Dr. Albert Flores",
    title: "Hematologists",
    stars: "4.8",
    reviews: "500",
  },
];

export const Doctors = () => {
  return (
    <div className="doctor-section" id="Doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>Meet Our Doctors</span>
        </h3>

        <p className="dt-description">
          Meet our exceptional team of specialist doctors, dedicated to
          providing top-notch healthcare services at HealthCare Life. Trust in
          their knowledge and experience to lead you towards a healthier and
          happier life.
        </p>
      </div>

      <div className="dt-cards-content">
        {doctorDetails.map((data, i) => (
          <DoctorCard
            key={i}
            img={data.img}
            name={data.name}
            title={data.title}
            stars={data.stars}
            reviews={data.reviews}
          />
        ))}
      </div>
    </div>
  );
};
