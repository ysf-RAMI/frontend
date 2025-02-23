import React from "react";
import { Container } from "react-bootstrap";
import Masonry from "react-masonry-css";

const PublicationsMasonry = () => {
  const publications = [
    {
      id: 1,
      title:
        "An efficient edge detection algorithm for fast intra-coding for 3D video extension of HEVC",
      authors: "H. Hamout, A. Elyousfi",
      journal: "Journal of Real-Time Image Processing",
      details:
        "vol. 16, no. 6, pp. 2093-2105, Sept. 13 (2017), DOI: 10.1007/s11554-017-0718-z.",
    },
    {
      id: 2,
      title:
        "Fast Depth Map Intra Coding for 3D Video Compression Based Tensor Feature Extraction and Data Analysis",
      authors: "H. Hamout, A. Elyousfi",
      journal: "IEEE Transactions on Circuits and Systems for Video Technology",
      details: "May 24 (2019), DOI: 10.1109/TCSVT.2019.2918770.",
    },
    // Add more publications here...
  ];

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <section className="section">
      <Container>
        <h2 className="section-title">Publications</h2>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {publications.map((pub) => (
            <div
              key={pub.id}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              <h5>{pub.title}</h5>
              <p>
                <strong>Authors:</strong> {pub.authors}
              </p>
              <p>
                <strong>Journal:</strong> <em>{pub.journal}</em>
              </p>
              <p>
                <strong>Details:</strong> {pub.details}
              </p>
            </div>
          ))}
        </Masonry>
      </Container>
    </section>
  );
};

export default PublicationsMasonry;
