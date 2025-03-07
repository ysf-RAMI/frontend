import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Article } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";
import "./PublicationsJournaux.css"; // Custom CSS for hover effects

export default function PublicationsJournaux() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);


  const publications = [
    {
      title:
        "An efficient edge detection algorithm for fast intra-coding for 3D video extension of HEVC",
      journal: "Journal of Real-Time Image Processing",
      date: "Sept. 13, 2017",
      doi: "10.1007/s11554-017-0718-z",
      authors: "H. Hamout, A. Elyousfi",
    },
    {
      title:
        "Fast Depth Map Intra Coding for 3D Video Compression Based Tensor Feature Extraction and Data Analysis",
      journal: "IEEE Transactions on Circuits and Systems for Video Technology",
      date: "May 24, 2019",
      doi: "10.1109/TCSVT.2019.2918770",
      authors: "H. Hamout, A. Elyousfi",
    },
    {
      title:
        "Fast 3D-HEVC PU size decision algorithm for depth map intra-video coding",
      journal: "Journal of Real-Time Image Processing",
      date: "June 14, 2019",
      doi: "10.1007/s11554-019-00890-x",
      authors: "H. Hamout, A. Elyousfi",
    },
    {
      title: "Fast CU size and mode decision algorithm for 3D-HEVC intercoding",
      journal: "Multimedia Tools and Application",
      date: "Dec. 18, 2019",
      doi: "10.1007/s11042-019-08461-9",
      authors: "S. Bakkouri, A. Elyousfi, H. Hamout",
    },
    {
      title: "Fast depth map intra-mode selection for 3D-HEVC intra-coding",
      journal: "Signal, Image and Video Processing",
      date: "March 17, 2020",
      doi: "10.1007/s11760-020-01669-5",
      authors: "H. Hamout, A. Elyousfi",
    },
    {
      title:
        "A Computation Complexity Reduction of Size Decision Algorithm in 3D-HEVC Depth Map Intracoding",
      journal: "Advances in Multimedia",
      date: "June 29, 2022",
      doi: "10.1155/2022/3507201",
      authors: "H. Hamout, A. Elyousfi",
    },
    {
      title:
        "Fast 3D-HEVC intra-prediction for depth map based on a self-organizing map and efficient features",
      journal: "Signal, Image and Video Processing",
      date: "December 16, 2023",
      doi: "10.1007/s11760-023-02904-5",
      authors: "H. Hamout, A. Elyousfi",
    },
  ];

  return (
    <section style={{ padding: "40px 0", background: "#fafafa" }}>
      <Container>
        <div
          data-aos="fade-up"
          style={{ textAlign: "center", marginBottom: "40px" }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            Publications Journaux
          </h2>
          <p style={{ fontSize: "18px", color: "#555" }}>
            Journal articles in the field of computer vision and signal
            processing.
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          {publications.map((pub, index) => (
            <Col
              xs={12}
              md={6}
              lg={4}
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="publication-card">
                <div className="publication-icon">
                  <Article />
                </div>
                <div className="publication-content">
                  <h3 className="publication-title">{pub.title}</h3>
                  <p className="publication-details">
                    <strong>Journal:</strong> {pub.journal} <br />
                    <strong>Date:</strong> {pub.date} |<br />{" "}
                    <strong>DOI:</strong> {pub.doi} <br />
                    <br /> {pub.authors}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
