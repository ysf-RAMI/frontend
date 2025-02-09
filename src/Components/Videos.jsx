import YouTube from "react-youtube";

export default function VideoPlayer({ url }) {
  if (!url) {
    return <div>No video URL provided.</div>;
  }

  const isYouTube = url.includes("youtube.com");

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
      {isYouTube ? (
        <YouTube videoId={url.split("v=")[1].split("&")[0]} />
      ) : (
        <video
          style={{ width: "100%", height: "100%" }}
          src={url}
          controls
          autoPlay
        />
      )}
    </div>
  );
}
