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
        overflow: "hidden", // no scrollbars
        margin: 0,
        padding: 0,
        background: "#000", // shows behind letterboxing
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
          transition: "opacity 300ms ease-out",
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
            height: "100%",
            objectFit: "contain", // ✅ show the whole image, no crop
            objectPosition: "center",
            filter: ready ? "blur(0px)" : "blur(8px)",
            transition: "filter 600ms ease-out",
          }}
        />
      </div>
    </main>
  );
}
