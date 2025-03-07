import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { School } from "@mui/icons-material";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Teaching() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Common styles
  const commonStyles = {
    contentStyle: {
      background: "#fff",
      color: "#333",
      border: "1px solid #eaeaea",
      borderRadius: "8px",
      boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
    },
    contentArrowStyle: {
      borderRight: "7px solid #eaeaea",
    },
    iconStyle: {
      background: "#f5f5f5",
      color: "#333",
      boxShadow: "0 0 0 4px #fff, inset 0 2px 0 rgba(0, 0, 0, 0.05)",
    },
  };

  return (
    <section style={{ padding: "40px 0", background: "#fafafa" }}>
      <Container>
        <div
          style={{ textAlign: "center", marginBottom: "40px" }}
          data-aos="fade-up"
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            Activités Pédagogiques Universitaires
          </h2>
          <p style={{ fontSize: "18px", color: "#555" }}>
            Enseignant (Cours/TD/TP) à l'Ecole Supérieure de Technologie à
            Guelmim
          </p>
        </div>

        <VerticalTimeline layout="1-column-left">
          {/* 2021-2022 */}
          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={commonStyles.contentStyle}
            contentArrowStyle={commonStyles.contentArrowStyle}
            date="2021-2022"
            iconStyle={commonStyles.iconStyle}
            icon={<School />}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              Enseignant
            </h3>
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Réseaux Locaux et Internet
                </span>{" "}
                - Filière DUT-Informatique, Semestre S3
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Conception Objet Avec UML
                </span>{" "}
                - Filière DUT-Informatique, Semestre S3
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Architecture des Ordinateurs
                </span>{" "}
                - Filière DUT-Informatique, Semestre S2
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Programmation Evénementielle
                </span>{" "}
                - Filière DUT-Informatique, Semestre S2
              </li>
            </ul>
          </VerticalTimelineElement>

          {/* 2022-2023 */}
          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={commonStyles.contentStyle}
            contentArrowStyle={commonStyles.contentArrowStyle}
            date="2022-2023"
            iconStyle={commonStyles.iconStyle}
            icon={<School />}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              Enseignant
            </h3>
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Codage Numérique et Architecture des Ordinateurs
                </span>{" "}
                - Filière DUT-Génie Informatique, Semestre S1
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Fondements des Réseaux Informatique
                </span>{" "}
                - Filière DUT-Génie Informatique, Semestre S2
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Réseaux Locaux et Internet
                </span>{" "}
                - Filière DUT-Informatique, Semestre S3
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Conception Objet Avec UML
                </span>{" "}
                - Filière DUT-Informatique, Semestre S3
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>Programmation HTML/CSS</span>{" "}
                - Filière DUT-Informatique, Semestre S4
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>Programmation Web</span> -
                Filière LP-ISD, Semestre S5
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Informatique Décisionnelle
                </span>{" "}
                - Filière LP-ISD, Semestre S6
              </li>
            </ul>
          </VerticalTimelineElement>

          {/* 2023-2024 */}
          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={commonStyles.contentStyle}
            contentArrowStyle={commonStyles.contentArrowStyle}
            date="2023-2024"
            iconStyle={commonStyles.iconStyle}
            icon={<School />}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              Enseignant
            </h3>
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Codage Numérique et Architecture des Ordinateurs
                </span>{" "}
                - Filière DUT-Génie Informatique, Semestre S1
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Fondements des Réseaux Informatique
                </span>{" "}
                - Filière DUT-Génie Informatique, Semestre S2
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Conception Objet Avec UML
                </span>{" "}
                - Filière DUT-Génie Informatique, Semestre S3
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Administration des Systèmes
                </span>{" "}
                - Filière DUT-Génie Informatique, Semestre S4
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>Programmation Web</span> -
                Filière LP-ISD, Semestre S5
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>Génie Logiciel</span> -
                Filière LP-ISD, Semestre S5
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Informatique Décisionnelle
                </span>{" "}
                - Filière LP-ISD, Semestre S6
              </li>
            </ul>
          </VerticalTimelineElement>

          {/* 2024-2025 */}
          <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={commonStyles.contentStyle}
            contentArrowStyle={commonStyles.contentArrowStyle}
            date="2024-2025"
            iconStyle={commonStyles.iconStyle}
            icon={<School />}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "15px",
              }}
            >
              Enseignant
            </h3>
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Circuit logique et Architecture des Ordinateurs
                </span>{" "}
                - Filière DUT-Génie Informatique, Semestre S1
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Algorithme et Bases de la Programmation
                </span>{" "}
                - Filière DUT-Génie Informatique, Semestre S1
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Circuit logique et Architecture des Ordinateurs
                </span>{" "}
                - Filière DUT-Réseaux Informatiques et Sécurités, Semestre S1
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>Réseaux Informatiques</span> -
                Filière DUT-Réseaux Informatiques et Sécurités, Semestre S1
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Conception Objet Avec UML
                </span>{" "}
                - Filière DUT-Génie Informatique, Semestre S3
              </li>
              <li style={{ marginBottom: "8px" }}>
                <span style={{ fontWeight: 500 }}>
                  Administration des Systèmes
                </span>{" "}
                - Filière DUT-Génie Informatique, Semestre S4
              </li>
            </ul>
          </VerticalTimelineElement>
        </VerticalTimeline>
      </Container>
    </section>
  );
}
