import "../styles/Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WhyUs from "../Components/Home/WhyUs";
import Call from "../Components/Home/Call";
import Hero from "../Components/Home/Hero";
import Footer from "../Components/Footer";
import AnnouncementSection from "../Components/Home/AnnouncementSection";
import HomeSectionProf from "../Components/Hamout/homeSectionProf";
import TeamSection from "../Components/TeamSection";

AOS.init();

export const Home = () => {
  return (
    <div className="home-container" style={{ userSelect: "none" }}>
      <ToastContainer />
      <Hero />
      <HomeSectionProf />
      <AnnouncementSection />
      <TeamSection />
      <Call />
      <WhyUs />
      <Footer />
    </div>
  );
};
