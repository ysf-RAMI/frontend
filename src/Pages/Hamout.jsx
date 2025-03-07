import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container } from "react-bootstrap";
import "../styles/portfolio.css";

import HeroSection from "../Components/portfolio/HeroSection";
import Educational from "../Components/portfolio/Educational";
import Competnces from "../Components/portfolio/Competences";
import Publications from "../Components/portfolio/PublicationsJournaux";
import Teaching from "../Components/portfolio/Teaching";
import Responsabilies from "../Components/portfolio/Responsibilities";
import Communications from "../Components/portfolio/Communication";
import PublicationsJournaux from "../Components/portfolio/PublicationsJournaux";

const Hamout = () => {
  window.scroll(0, 0);
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="modern-portfolio" style={{ backgroundColor: "#f8f8f8" }}>
      {/* Hero Section */}
      <HeroSection />
      {/* Educational Timeline */}
      <Educational />
      <Competnces />

      {/* Publications */}
      <PublicationsJournaux />
      <Communications />
      {/* Teaching Experience */}
      <Teaching />
      {/* Administrative Responsibilities */}
      <Responsabilies />
    </div>
  );
};

export default Hamout;
