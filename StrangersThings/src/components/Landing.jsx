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
    <main
      style={{
        height: "100dvh",
        width: "100dvw",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        background: "#000",
        display: "grid",
        placeItems: "center",
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
          height: "100%",
          width: "100%",
          cursor: "pointer",
          opacity: leaving ? 0 : ready ? 1 : 0,
          transform: leaving ? "scale(0.995)" : "scale(1)",
          transition: "opacity 300ms ease-out, transform 300ms ease-out",
          willChange: "opacity, transform",
          position: "relative",
          pointerEvents: leaving ? "none" : "auto",
        }}
        className="landing-container"
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
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            filter: ready ? "blur(0px)" : "blur(8px)",
            transition: "filter 600ms ease-out",
            transitionDelay: ready ? "80ms" : "0ms",
            willChange: "filter",
          }}
        />
        {/* Fade overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.3) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
      <style>
        {`
          .landing-container {
            transition: transform 0.4s ease-in-out;
          }
          .landing-container:hover {
            transform: scale(1.02);
          }
          @media (max-width: 768px) {
            main img {
              object-fit: contain !important;
            }
            main div[style*="absolute"] {
              background: none !important; /* no fade on mobile */
            }
            .landing-container:hover {
              transform: scale(1); /* no hover scale on mobile */
            }
          }
        `}
      </style>
    </main>
  );
}
