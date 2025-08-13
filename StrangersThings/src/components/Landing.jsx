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
      className="landing-root"
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
        className="landing-container"
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
      >
        <img
          src="/monster image.jpg"
          alt="Enter Strangers' Things"
          loading="eager"
          decoding="async"
          onLoad={() => setReady(true)}
          onError={() => setReady(true)}
          className="landing-img"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover", // desktop default
            objectPosition: "center",
            filter: ready ? "blur(0px)" : "blur(8px)",
            transition: "filter 600ms ease-out",
            transitionDelay: ready ? "80ms" : "0ms",
            willChange: "filter",
          }}
        />
        {/* Fade overlay */}
        <div
          className="landing-fade"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.25) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Scoped styles so nothing leaks */}
      <style>{`
        /* Contain (no crop) on small screens */
        @media (max-width: 768px) {
          .landing-root .landing-img { object-fit: contain !important; }
          .landing-root .landing-fade { background: none !important; }
        }

        /* Hover scale only on devices that support hover */
        @media (hover: hover) and (pointer: fine) {
          .landing-root .landing-container {
            transition: transform 0.35s ease-in-out;
          }
          .landing-root .landing-container:hover {
            transform: scale(1.02);
          }
        }
      `}</style>
    </main>
  );
}
