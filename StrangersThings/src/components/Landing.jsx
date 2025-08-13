import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const goToApp = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => nav("/posts"), 600);
  };

  return (
    <div
      // Full-screen overlay that does not rely on body/html styles
      style={{
        position: "fixed",
        inset: 0, // top:0 right:0 bottom:0 left:0
        zIndex: 9999,
        background: "#000", // covers any body background/margins
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        cursor: "pointer",
        opacity: leaving ? 0 : ready ? 1 : 0,
        transition: "opacity 300ms ease-out",
      }}
      onClick={goToApp}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? goToApp() : null)}
      aria-label="Enter Strangers' Things"
    >
      <img
        src="/monster-image.jpg"
        alt="Enter Strangers' Things"
        loading="eager"
        decoding="async"
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
        style={{
          display: "block",
          maxWidth: "100vw",
          maxHeight: "100vh",
          width: "auto",
          height: "auto",
          objectFit: "contain", // full image, no crop
          objectPosition: "center",
          filter: ready ? "blur(0px)" : "blur(8px)",
          transition: "filter 600ms ease-out",
        }}
      />
    </div>
  );
}
