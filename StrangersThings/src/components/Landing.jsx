import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Landing() {
  const nav = useNavigate();
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  // Force full-black page background and zero margins while on Landing
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlStyle = html.getAttribute("style") || "";
    const prevBodyStyle = body.getAttribute("style") || "";

    html.style.cssText = `${prevHtmlStyle};height:100%;margin:0;padding:0;background:#000;`;
    body.style.cssText = `${prevBodyStyle};height:100%;margin:0;padding:0;background:#000;`;

    return () => {
      html.setAttribute("style", prevHtmlStyle);
      body.setAttribute("style", prevBodyStyle);
    };
  }, []);

  const goToApp = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => nav("/posts"), 600);
  };

  return (
    <main
      style={{
        height: "100svh", // small-viewport safe
        width: "100svw",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          opacity: leaving ? 0 : ready ? 1 : 0,
          transition: "opacity 300ms ease-out",
          pointerEvents: leaving ? "none" : "auto",
          background: "#000",
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
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain", // never crop
            objectPosition: "center",
            filter: ready ? "blur(0px)" : "blur(8px)",
            transition: "filter 600ms ease-out",
          }}
        />
      </div>
    </main>
  );
}
