import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaLinkedin, FaResearchgate, FaGoogle } from "react-icons/fa";

import { GiDiploma, GiArchiveResearch, GiTeacher } from "react-icons/gi";
import hamoutimage from "../assets/hamoutpic.jpg";
import javaJee from "../assets/icon/1_N5Ta2UFc34fwcPnikjIJ5A.ico";
import { FcDiploma1, FcDiploma2 } from "react-icons/fc";
import { Container, Row, Col } from "react-bootstrap";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import "../styles/hamout.css";

const iconComponents = {
  C: () => (
    <img
      src="https://img.icons8.com/color/48/c-programming.png"
      alt="C"
      style={{ width: 40, height: 40 }}
    />
  ),
  "C++": () => (
    <img
      src="https://img.icons8.com/color/48/c-plus-plus-logo.png"
      alt="C++"
      style={{ width: 40, height: 40 }}
    />
  ),
  Java: () => (
    <img
      src="https://img.icons8.com/color/48/java-coffee-cup-logo.png"
      alt="Java"
      style={{ width: 40, height: 40 }}
    />
  ),
  VB: () => (
    <img
      src="https://img.icons8.com/?size=100&id=3845&format=png&color=000000"
      alt="VB"
      style={{ width: 40, height: 40 }}
    />
  ),
  MySQL: () => (
    <img
      src="https://img.icons8.com/color/48/mysql-logo.png"
      alt="MySQL"
      style={{ width: 40, height: 40 }}
    />
  ),
  UML: () => (
    <img
      src="https://img.icons8.com/?size=100&id=ZCWpp3WQaB5A&format=png&color=000000"
      alt="UML"
      style={{ width: 40, height: 40 }}
    />
  ),
  MERISE: () => (
    <img
      src="https://img.icons8.com/?size=100&id=YUKvLGE4zROg&format=png&color=000000"
      alt="MERISE"
      style={{ width: 40, height: 40 }}
    />
  ),
  "HTML/CSS": () => (
    <img
      src="https://img.icons8.com/color/48/html-5.png"
      alt="HTML/CSS"
      style={{ width: 40, height: 40 }}
    />
  ),
  PHP: () => (
    <img
      src="https://img.icons8.com/color/48/php.png"
      alt="PHP"
      style={{ width: 40, height: 40 }}
    />
  ),
  JavaScript: () => (
    <img
      src="https://img.icons8.com/color/48/javascript.png"
      alt="JavaScript"
      style={{ width: 40, height: 40 }}
    />
  ),
  "Java EE": () => (
    <img src={javaJee} alt="Java EE" style={{ width: 40, height: 40 }} />
  ),
  "MS Office": () => (
    <img
      src="https://img.icons8.com/?size=100&id=37619&format=png&color=000000"
      alt="MS Office"
      style={{ width: 40, height: 40 }}
    />
  ),
  LaTeX: () => (
    <img
      src="https://img.icons8.com/color/48/latex.png"
      alt="LaTeX"
      style={{ width: 40, height: 40 }}
    />
  ),
  Windows: () => (
    <img
      src="https://img.icons8.com/color/48/windows-10.png"
      alt="Windows"
      style={{ width: 40, height: 40 }}
    />
  ),
  Linux: () => (
    <img
      src="https://img.icons8.com/color/48/linux.png"
      alt="Linux"
      style={{ width: 40, height: 40 }}
    />
  ),
  Eclipse: () => (
    <img
      src="https://img.icons8.com/color/48/eclipse.png"
      alt="Eclipse"
      style={{ width: 40, height: 40 }}
    />
  ),
  "Visual Studio": () => (
    <img
      src="https://img.icons8.com/color/48/visual-studio.png"
      alt="Visual Studio"
      style={{ width: 40, height: 40 }}
    />
  ),
  "Réseaux Informatique": () => (
    <img
      src="https://img.icons8.com/color/48/network.png"
      alt="Réseaux Informatique"
      style={{ width: 40, height: 40 }}
    />
  ),
  "Data Mining": () => (
    <img
      src="https://img.icons8.com/?size=100&id=uXgMijzXD4lU&format=png&color=000000"
      alt="Data Mining"
      style={{ width: 40, height: 40 }}
    />
  ),
  "Machine Learning": () => (
    <img
      src="https://img.icons8.com/?size=100&id=gTN9eaZkKLFI&format=png&color=000000"
      alt="Machine Learning"
      style={{ width: 40, height: 40 }}
    />
  ),
  Arabe: () => (
    <img
      src="https://img.icons8.com/color/48/saudi-arabia.png"
      alt="Arabic"
      style={{ width: 40, height: 40 }}
    />
  ),
  Français: () => (
    <img
      src="https://img.icons8.com/color/48/france.png"
      alt="French"
      style={{ width: 40, height: 40 }}
    />
  ),
  Anglais: () => (
    <img
      src="https://img.icons8.com/color/48/usa.png"
      alt="English"
      style={{ width: 40, height: 40 }}
    />
  ),
};

const TechIcon = ({ name, Icon }) => {
  return (
    <motion.div
      className="tech-icon-container"
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="tech-icon m-2">
        {typeof Icon === "function" ? <Icon /> : <Icon size={30} />}
        <span className="tech-name" style={{marginBottom: "14px"}}>{name}</span>
      </div>
    </motion.div>
  );
};

const Hamout = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="modern-portfolio">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');

          .modern-portfolio {
            background:rgba(137, 88, 78, 0);
            min-height: 100vh;
            font-family: 'Open Sans', sans-serif;
          }
          
          .hero-section {
            min-height: 100vh;
            background: linear-gradient(135deg,rgba(169, 169, 169, 0.31) 0%,rgba(0, 0, 0, 0.15) 100%);
            color: white;
            padding: 4rem 0;
          }
          
          .profile-image {
            width: 400px;
            height: 400px;
            border-radius: 50%;
            border: 5px solid white;
            box-shadow: 0 0 30px rgba(70, 31, 31, 0.47);
          }
          
          .social-icons {
            display: flex;
            gap: 1rem;
            margin-top: 2rem;
          }
          
          .social-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #89584e;
            transition: all 0.3s ease;
          }
          
          .social-icon:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          }
          
          .timeline {
            position: relative;
            padding: 2rem 0;
          }
          
          .timeline-line {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 2px;
            height: 100%;
            background: #89584e;
          }
          
          .timeline-item {
            margin-bottom: 2rem;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 15px rgba(0,0,0,0.1);
            background: white;
          }
          
          .tech-icon-container {
            display: inline-flex;
            margin: 0.5rem;
            position: relative;
          }
          
          .tech-icon {
            padding: 1rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          }
          
          .tech-name {
            position: absolute;
            bottom: -25px;
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            transition: all 0.3s ease;
            background: #333;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
          }
          
          .tech-icon-container:hover .tech-name {
            opacity: 1;
            bottom: -30px;
          }
          
          .section {
            padding: 4rem 0;
          }
          
          .section-title {
            font-size: 2rem;
            color: #89584e;
            margin-bottom: 2rem;
            text-align: center;
          }
        `}
      </style>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col
              md={6}
              className="text-center"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <motion.img
                src={hamoutimage}
                alt="Dr. Hamza HAMOUT"
                className="profile-image"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </Col>
            <Col md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div
                  className="social-icons"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <h1>Dr. Hamza HAMOUT</h1>
                  <h3>Maître de Conférences Habilité</h3>
                  <p>École Supérieure de Technologie Guelmim</p>
                  <div className="social-icons" style={{ marginTop: "-10px" }}>
                    <motion.a
                      href="#"
                      className="social-icon"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaLinkedin />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="social-icon"
                      whileHover={{
                        scale: 1.1,
                      }}
                    >
                      <FaResearchgate />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="social-icon"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaGoogle />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Educational Timeline */}
      <section className="section">
        <Container>
          <h2 className="section-title">Parcours Universitaire</h2>
          <Timeline position="alternate">
            {/* 2025-Présent */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot style={{ backgroundColor: "brown" }} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h4>2025-Présent</h4>
                <h3>Maître de Conférences Habilité</h3>
                <p>École Supérieure de Technologie Guelmim</p>
              </TimelineContent>
            </TimelineItem>

            {/* 2021-2025 */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot style={{ backgroundColor: "brown" }}>
                  <GiTeacher />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h4>2021-2025</h4>
                <h3>Professeur d'Enseignement Supérieur Assistant</h3>
                <p>École Supérieure de Technologie Guelmim</p>
              </TimelineContent>
            </TimelineItem>

            {/* 2023 */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot style={{ backgroundColor: "brown" }}>
                  <GiArchiveResearch />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h4>2023</h4>
                <h3>Habilité Universitaire à Diriger des Recherches</h3>
                <p>
                  Laboratoire des Systèmes Informatiques & Vision (LabSIV),
                  Université Ibno Zohr
                </p>
                <p>Spécialité: Informatique</p>
                <p>
                  Sujet de recherche: Algorithme de Réduction de la Complexité
                  des Tailles Intra et des Modes Intra Appliqué au Codage en
                  Intra des Cartes de Profondeur en 3D-HEVC
                </p>
              </TimelineContent>
            </TimelineItem>

            {/* 2016-2020 */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot style={{ backgroundColor: "brown" }}>
                  <FcDiploma2 style={{ backgroundColor: "white" }} />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h4>2016-2020</h4>
                <h3>Doctorat en Mathématiques, Informatique et Applications</h3>
                <p>
                  Laboratoire des Systèmes Informatiques & Vision (LabSIV),
                  Université Ibno Zohr
                </p>
                <p>Spécialité: Informatique</p>
                <p>
                  Sujet de recherche: La réduction de la complexité des
                  algorithmes de la compression des cartes de profondeurs de la
                  vidéo 3D dans la norme de codage de la vidéo 3D-HEVC
                </p>
                <p>Mention: Très Honorable avec Félicitation du Jury</p>
              </TimelineContent>
            </TimelineItem>

            {/* 2014-2016 */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot style={{ backgroundColor: "brown" }}>
                  <FcDiploma1 />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <h4>2014-2016</h4>
                <h3>
                  Master Technique: Systèmes Intelligents et Réseaux (SIR)
                </h3>
                <p>
                  Faculté des Sciences et Techniques de Fès, Université Sidi
                  Mohamed Ben Abdellah
                </p>
                <p>Spécialité: Informatique</p>
                <p>
                  Sujet de recherche: Amélioration des algorithmes de codage de
                  la vidéo 3D
                </p>
                <p>Mention: Bien</p>
              </TimelineContent>
            </TimelineItem>

            {/* 2011-2014 */}
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot style={{ backgroundColor: "brown" }}>
                  <GiDiploma />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <h4>2011-2014</h4>
                <h3>
                  Licence Fondamentale en Sciences Mathématique et Informatique
                  (SMI)
                </h3>
                <p>Faculté des Sciences d’Agadir, Université Ibn Zohr</p>
                <p>Spécialité: Génie Logiciel</p>
                <p>
                  Sujet du projet fin d’étude: Réalisation d’un outil E-Learning
                  : Application pour la résolution des équations linéaires
                </p>
                <p>Mention: Bien (Majorant)</p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Container>
      </section>

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

      {/* Publications */}
      <section className="section">
        <Container>
          <h2 className="section-title">
            Publications Journaux & Communications :
          </h2>
          <ul>
            <li>
              <strong>H. Hamout, A. Elyousfi</strong>, “An efficient edge
              detection algorithm for fast intra-coding for 3D video extension
              of HEVC,” in <em>Journal of Real-Time Image Processing</em>, vol.
              16, no. 6, pp. 2093-2105, Sept. 13 (2017), DOI:
              10.1007/s11554-017-0718-z.
            </li>
            <li>
              <strong>H. Hamout, A. Elyousfi</strong>, “Fast Depth Map Intra
              Coding for 3D Video Compression Based Tensor Feature Extraction
              and Data Analysis,” in{" "}
              <em>
                IEEE Transactions on Circuits and Systems for Video Technology
              </em>
              , May 24 (2019), DOI: 10.1109/TCSVT.2019.2918770.
            </li>
            <li>
              <strong>H. Hamout, A. Elyousfi</strong>, “Fast 3D-HEVC PU size
              decision algorithm for depth map intra-video coding,” in{" "}
              <em>Journal of Real-Time Image Processing</em>, June 14 (2019),
              DOI: 10.1007/s11554-019-00890-x.
            </li>
            <li>
              <strong>S. Bakkouri, A. Elyousfi, and H. Hamout</strong>, “Fast CU
              size and mode decision algorithm for 3D-HEVC intercoding,” in{" "}
              <em>Multimedia Tools and Application</em>, Dec. 18 (2019), DOI:
              10.1007/s11042-019-08461-9.
            </li>
            <li>
              <strong>H. Hamout, A. Elyousfi</strong>, “Fast depth map
              intra-mode selection for 3D-HEVC intra-coding,” in{" "}
              <em>Signal, Image and Video Processing</em>, March 17 (2020), DOI:
              10.1007/s11760-020-01669-5.
            </li>
            <li>
              <strong>H. Hamout, A. Elyousfi</strong>, “A Computation Complexity
              Reduction of Size Decision Algorithm in 3D-HEVC Depth Map
              Intracoding,” in <em>Advances in Multimedia</em>, June 29 (2022),
              DOI: 10.1155/2022/3507201.
            </li>
            <li>
              <strong>H. Hamout, A. Elyousfi</strong>, “Fast 3D-HEVC
              intra-prediction for depth map based on a self-organizing map and
              efficient features,” in{" "}
              <em>Signal, Image and Video Processing</em>, December 16 (2023),
              DOI: 10.1007/s11760-023-02904-5.
            </li>
          </ul>
        </Container>
      </section>
      {/* Teaching Experience */}
      <section className="section">
        <Container>
          <h2 className="section-title">
            Activités Pédagogiques Universitaires
          </h2>
          <h3>
            Enseignant (Cours/TD/TP) à l’Ecole Supérieure de Technologie à
            Guelmim
          </h3>
          <div className="horizontal-timeline">
            <div className="timeline-line"></div>
            <div className="timeline-items">
              {/* 2021-2022 */}
              <div className="timeline-item" data-aos="fade-up">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>2021-2022</h4>
                  <p>
                    Réseaux Locaux et Internet, Conception Objet Avec UML,
                    Architecture des Ordinateurs, Programmation Evénementielle
                  </p>
                </div>
              </div>

              {/* 2022-2023 */}
              <div
                className="timeline-item"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>2022-2023</h4>
                  <p>
                    Codage Numérique et Architecture des Ordinateurs, Fondements
                    des Réseaux Informatique, Réseaux Locaux et Internet,
                    Conception Objet Avec UML, Programmation HTML/CSS,
                    Programmation Web, Informatique Décisionnelle
                  </p>
                </div>
              </div>

              {/* 2023-2024 */}
              <div
                className="timeline-item"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>2023-2024</h4>
                  <p>
                    Codage Numérique et Architecture des Ordinateurs, Fondements
                    des Réseaux Informatique, Conception Objet Avec UML,
                    Administration des Systèmes, Programmation Web, Génie
                    Logiciel, Informatique Décisionnelle
                  </p>
                </div>
              </div>

              {/* 2024-2025 */}
              <div
                className="timeline-item"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>2024-2025</h4>
                  <p>
                    Circuit logique et Architecture des Ordinateurs, Algorithme
                    et Bases de la Programmation, Conception Objet Avec UML,
                    Administration des Systèmes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* Administrative Responsibilities */}
      <section className="section">
        <Container>
          <h2 className="section-title">
            Responsabilités Pédagogiques & Tâches Administratives
          </h2>
          <ul>
            <li>
              <strong>Coordinateur de Filière Génie Informatique</strong>,
              Département Génie Informatique à l’Ecole Supérieure de Technologie
              à Guelmim (06/2024-présent)
            </li>
            <li>
              <strong>
                Membre au Conseil d’Etablissement et de la Commission
                Pédagogique
              </strong>{" "}
              (2024-présent)
            </li>
            <li>
              <strong>
                Coordinateur de Modules Filière DUT-Génie Informatique
              </strong>
              : Architecture des Ordinateurs, Réseaux Informatiques, Culture
              Digitale, Analyse et Conception Orientées Objet avec UML
              (2022-présent)
            </li>
            <li>
              <strong>
                Coordinateur de Modules Filière DUT-Ingénierie de données
              </strong>
              : Data Mining, Initiation en Machine Learning avec Python
              (2024-présent)
            </li>
            <li>
              <strong>
                Coordinateur de Modules Filière Licence-Sciences de données
              </strong>
              : Exploration de données, Apprentissage Automatique (2024-présent)
            </li>
            <li>
              <strong>
                Coordinateur de Modules Filière Licence-Sécurité Informatique et
                Réseaux
              </strong>
              : Administration des Systèmes (2024-présent)
            </li>
          </ul>
        </Container>
      </section>
    </div>
  );
};

export default Hamout;
