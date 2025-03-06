import { color, motion } from "framer-motion";
import iconComponents from "../../Components/portfolio/iconComponents";
import { Container } from "react-bootstrap";

export default function Competnces() {
  const TechIcon = ({ name, Icon }) => {
    return (
      <motion.div
        className="tech-icon-container"
        whileHover={{ scale: 1.1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="tech-icon m-2" >
          {typeof Icon === "function" ? <Icon /> : <Icon size={30} />}
          <span className="tech-name" style={{ marginBottom: "14px" }}>
            {name}
          </span>
        </div>
      </motion.div>
    );
  };
  return (
    <section className="section">
      <Container>
        <h6 className="section-title">Compétences & Langues</h6>
        <div className="text-center">
          <div className="d-flex flex-wrap justify-content-center">
            {[
              "C",
              "C++",
              "Java",
              "VB",
              "MySQL",
              "UML",
              "MERISE",
              "HTML/CSS",
              "PHP",
              "JavaScript",
              "Java EE",
              "MS Office",
              "LaTeX",
              "Data Mining",
              "Machine Learning",
              "Réseaux Informatique",
              "Eclipse",
              "Visual Studio",
              "Windows",
              "Linux",
            ].map((tech) => (
              <TechIcon key={tech} name={tech} Icon={iconComponents[tech]} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
