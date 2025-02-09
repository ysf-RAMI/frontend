export default function PDFViewer({ url }) {
  if (!url) {
    return <div>No PDF URL provided.</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        backgroundColor: "#f4f4f9",
      }}
    >
      <iframe
        src={url}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="PDF Viewer"
      />
    </div>
  );
}
