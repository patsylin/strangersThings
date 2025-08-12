import { useNavigate } from "react-router-dom";

export default function Landing() {
  const nav = useNavigate();
  const goToApp = () => nav("/posts");

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f6f6f6",
        padding: "2rem",
      }}
    >
      <div
        onClick={goToApp}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" || e.key === " " ? goToApp() : null
        }
        aria-label="Enter Strangers' Things"
        style={{
          width: "min(960px, 95vw)",
          cursor: "pointer",
          boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#fff",
          position: "relative",
        }}
      >
        <img
          src="/monster image.jpg" // keep this filename in /public
          alt="Enter Strangers' Things"
          loading="lazy"
          style={{ display: "block", width: "100%", height: "auto" }}
        />
        <div style={{ padding: "1rem 1.25rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.25rem" }}>Strangers' Things</h1>
          <p style={{ margin: "0.25rem 0 0", color: "#555" }}>
            Click the image to enter the marketplace.
          </p>
        </div>
      </div>
    </main>
  );
}
