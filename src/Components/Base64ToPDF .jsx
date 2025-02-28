import { useEffect, useState } from "react";
import axios from "axios";

const PDFViewer = ({ lien }) => {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    if (lien) {
      setPdfUrl(`http://localhost:8080/api/files/getFile/${lien}`);
    }
    console.log(pdfUrl);
  }, [lien]);

  return (
    <div className="w-full h-screen">
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          className="w-full h-full"
          title="PDF Viewer"
        ></iframe>
      ) : (
        <p>Chargement du PDF...</p>
      )}
    </div>
  );
};

export default PDFViewer;
