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
import TeamSection from "../Components/TeamSection";
import ProfSection from "../Components/Hamout/ProfSection";

AOS.init();

export const Home = () => {
  return (
    <div className="home-container" style={{ userSelect: "none" }}>
      <ToastContainer
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick={true}
        newestOnTop={true}
        closeButton={false}
        enableMultiContainer={true}
        position="top-center"
        zIndex={9999}
      />
      <Hero />
      <ProfSection />
      <AnnouncementSection />
      <TeamSection />
      <Call />
      <WhyUs />
      <Footer />
    </div>
  );
};
