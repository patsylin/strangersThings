import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Landing() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false); // fade/blur IN
  const [leaving, setLeaving] = useState(false); // fade OUT

  const goToApp = () => {
    if (leaving) return;
    setLeaving(true); // start fade-out
    setTimeout(() => nav("/posts"), 600); // navigate after animation
  };

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
          // container fade/scale in; fade out on leave
          opacity: leaving ? 0 : ready ? 1 : 0,
          transform: leaving
            ? "scale(0.99)"
            : ready
            ? "scale(1)"
            : "scale(0.985)",
          transition: "opacity 300ms ease-out, transform 300ms ease-out",
          willChange: "opacity, transform",
          pointerEvents: leaving ? "none" : "auto",
        }}
      >
        <img
          src="/monster image.jpg"
          alt="Enter Strangers' Things"
          loading="eager"
          decoding="async"
          onLoad={() => setReady(true)}
          onError={() => setReady(true)}
          style={{
            display: "block",
            width: "100%",
            height: "auto",
            // blur-in (with tiny delay) while loading
            filter: ready ? "blur(0px)" : "blur(8px)",
            transition: "filter 600ms ease-out",
            transitionDelay: ready ? "80ms" : "0ms",
            willChange: "filter",
          }}
        />
      </div>
    </main>
  );
}
