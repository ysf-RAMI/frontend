import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Element, scroller } from "react-scroll";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import YouTube from "react-youtube";
import WhyUs from "../Components/Home/WhyUs";
import About from "../Components/Home/About";
import Call from "../Components/Home/Call";
import Testimonial from "../Components/Home/Testimonial";
import Features from "../Components/Home/Features";
import Hero from "../Components/Home/Hero";
import Footer from "../Components/Footer";
import ProfessorsSection from "../Components/Home/ProfessorsSection";
import AnnouncementSection from "../Components/Home/AnnouncementSection";
import HomeSectionProf from "../Components/Hamout/homeSectionProf";

AOS.init();

export const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function handleClick() {
    navigate("/filiere");
    toast.success("Redirection vers la page des filières!");
  }

  const scrollToSection = (element) => {
    scroller.scrollTo(element, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -50, // Adjust offset if needed
    });
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="home-container" style={{ userSelect: "none" }}>
      <ToastContainer />
      <Hero />
      <HomeSectionProf />
      <AnnouncementSection />
      <ProfessorsSection />
      <Features />
      <Testimonial />
      <Call />
      <About />
      <WhyUs />
      <Footer />
    </div>
  );
};
