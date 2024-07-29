import React from "react";
import { Hero } from "../Component/Hero.jsx";
import { Services } from "./Services.jsx";
import { About } from "./About.jsx";
import { BookAppointment } from "./BookAppointment.jsx";
import { Reviews } from "./Reviews.jsx";
import { Doctors } from "./Doctors.jsx";
import { Footer } from "./Footer.jsx";

const Dashboard = () => {
  return (
    <div className="home-section">
      <Hero />
      <Services />
      <About />
      <BookAppointment />
      <Reviews />
      <Doctors />
      <Footer />
    </div>
  );
};

export default Dashboard;
