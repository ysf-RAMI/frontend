import { GiDiploma, GiArchiveResearch, GiTeacher } from "react-icons/gi";
import { FcDiploma1, FcDiploma2 } from "react-icons/fc";
import { Container } from "react-bootstrap";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";

const Educational = () => {
  return (
    <section className="section">
      <Container>
        <h2 className="section-title" style={{ color: "#333" }}>
          Parcours Universitaire
        </h2>
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
              <h4>2024</h4>
              <h3>Habilité Universitaire à Diriger des Recherches</h3>
              <p>
                Laboratoire des Systèmes Informatiques & Vision (LabSIV),
                Université Ibno Zohr
              </p>
              <p>Spécialité: Informatique</p>
              <p>
                Sujet de recherche: Algorithme de Réduction de la Complexité des
                Tailles Intra et des Modes Intra Appliqué au Codage en Intra des
                Cartes de Profondeur en 3D-HEVC
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
              <h3>Master Technique: Systèmes Intelligents et Réseaux (SIR)</h3>
              <p>
                Faculté des Sciences et Techniques de Fès, Université Sidi
                Mohamed Ben Abdellah
              </p>
              <p>Spécialité: Informatique</p>
              <p>
                Sujet de recherche: Amélioration des algorithmes de codage de la
                vidéo 3D
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
                Sujet du projet fin d’étude: Réalisation d’un outil E-Learning :
                Application pour la résolution des équations linéaires
              </p>
              <p>Mention: Bien (Majorant)</p>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Container>
    </section>
  );
};

export default Educational;
