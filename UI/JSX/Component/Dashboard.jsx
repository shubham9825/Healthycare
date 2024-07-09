import React from "react";
import { Hero } from "../Component/Hero.jsx";
import { Info } from "./Info.jsx";
import { About } from "./About.jsx";
import { BookAppointment } from "./BookAppointment.jsx";
import { Reviews } from "./Reviews.jsx";
import { Doctors } from "./Doctors.jsx";
import { Footer } from "./Footer.jsx";

const Dashboard = () => {
  return (
    <div className="home-section">
      <Hero />
      <Info />
      <About />
      <BookAppointment />
      <Reviews />
      <Doctors />
      <Footer />
    </div>
  );
};

export default Dashboard;
