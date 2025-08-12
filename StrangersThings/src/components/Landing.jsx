import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const nav = useNavigate();
  const goToApp = () => nav("/posts");
  const [ready, setReady] = useState(false);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f6f6f6",
        margin: 0,
        padding: 0,
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
          width: "95vw",
          maxWidth: "960px",
          cursor: "pointer",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#fff",
          boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
          // fade + subtle scale on load
          opacity: ready ? 1 : 0,
          transform: ready ? "scale(1)" : "scale(0.985)",
          transition: "opacity 500ms ease, transform 500ms ease",
          willChange: "opacity, transform",
        }}
      >
        <img
          src="/monster image.jpg" // file lives in /public
          alt="Enter Strangers' Things"
          loading="eager"
          decoding="async"
          onLoad={() => setReady(true)}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
          }}
        />
      </div>
    </main>
  );
}
