import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Article, Code, Computer, Group, School } from "@mui/icons-material";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Communications.css";

export default function Communications() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const publications = [
    {
      year: "2016",
      title: "IEEE/ACS 13th International Conference",
      description:
        'A. Elyousfi, H. Hamout and A. E. Hachimi, "An efficient intra block size decision for H.264/AVC encoding optimization," Agadir, 2016, pp. 1-5.',
      icon: <Article />,
      peapole: "H. Hamout and A. Elyousfi, A. E. Hachimi,",
    },
    {
      year: "2017",
      title: "Intelligent Systems and Computer Vision (ISCV)",
      description:
        'A. Elyousfi, A. E. Hachimi and H. Hamout, "Texture complexity based fast and efficient intra block mode decision algorithm for H.264/AVC," Fez, 2017, pp. 1-4.',
      icon: <Code />,
      peapole: "H. Hamout and A. Elyousfi, A. E. Hachimi",
    },
    {
      year: "2017",
      title: "European Signal Processing Conference (EUSIPCO)",
      description:
        'H. Hamout and A. Elyousfi, "Low complexity intra mode decision algorithm for 3D-HEVC," Kos, 2017, pp. 1475-1479.',
      icon: <Computer />,
      peapole: "H. Hamout and A. Elyousfi,",
    },
    {
      year: "2018",
      title:
        "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)",
      description:
        '"Fast Texture Intra Size Coding Based On Big Data Clustering for 3D-Hevc," Calgary, AB, 2018, pp. 1728-1732.',
      icon: <Article />,
      peapole: "H. Hamout and A. Elyousfi,",
    },
    {
      year: "2018",
      title: "IEEE International Conference on Image Processing (ICIP)",
      description:
        'H. Hamout and A. Elyousfi, "Fast Depth Map Intra Coding Based Structure Tensor Data Analysis," Athens, 2018, pp. 1802-1806.',
      icon: <Code />,
      peapole: "H. Hamout and A. Elyousfi,",
    },
    {
      year: "2020",
      title:
        "IEEE International Conference on Intelligent Systems and Computer Sciences",
      description:
        'A. Hammani, H. Hamout and A. Elyousfi, "Fast Depth Map Intra Mode Prediction Based on Self-Organizing Map," Fez, 2020, pp. 1-5.',
      icon: <Computer />,
      peapole: "H. Hamout and A. Elyousfi,A. Hammani,",
    },
    {
      year: "2023",
      title:
        "International Conference on Artificial Intelligence and Green Computing (ICAIGC)",
      description:
        'H. Hamout and A. Elyousfi, "Low 3D-HEVC Depth Map Intra Modes Selection Complexity Based on Clustering Algorithm and an Efficient Edge Detection," Beni Mellal, 2023, pp. 1-14.',
      icon: <Article />,
      peapole: "H. Hamout and A. Elyousfi,",
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
            Communications Nationales & Internationales
          </h2>
        </div>

        <Row
          className="g-2 justify-content-center"
          style={{ cursor: "pointer" }}
        >
          {publications.map((pub, index) => (
            <Col
              key={index}
              xs={12}
              md={6}
              lg={4}
              className="d-flex justify-content-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="publication-card">
                <div className="card-icon">{pub.icon}</div>
                <br />
                <h3 className="card-title">
                  {pub.title} - {pub.year}
                </h3>
                
                <p className="card-description">{pub.description}</p>
                <p className="card-description" style={{color:"grey"}}> <Group /> : {pub.peapole}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
