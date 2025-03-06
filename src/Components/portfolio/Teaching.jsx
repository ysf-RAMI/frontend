import { Container } from "react-bootstrap";


export default function Teaching(){
    return (
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
    );
}