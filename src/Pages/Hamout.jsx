import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container } from "react-bootstrap";
import "../styles/portfolio.css";

import HeroSection from "../Components/portfolio/HeroSection";
import Educational from "../Components/portfolio/Educational";
import Competnces from "../Components/portfolio/Competences";
import Publications from "../Components/portfolio/Publications";
import Teaching from "../Components/portfolio/Teaching";
import Responsabilies from "../Components/portfolio/Responsibilities";

const Hamout = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="modern-portfolio">
      {/* Hero Section */}
      <HeroSection />
      {/* Educational Timeline */}
      <Educational />
      <Competnces />

      {/* Publications */}
      <Publications />
      {/* Teaching Experience */}
      <Teaching />
      {/* Administrative Responsibilities */}
      <Responsabilies />
    </div>
  );
};

export default Hamout;
