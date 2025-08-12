import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, fetchUserData } from "../fetching";

export default function Register({ setToken, setUsername }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await registerUser(usernameInput, password);
      const token = res?.data?.token || res?.token;
      if (!token) throw new Error("Registration failed.");
      setToken(token);
      localStorage.setItem("token", token);

      const me = await fetchUserData(token).catch(() => null);
      const uname =
        me?.username ||
        me?.data?.username ||
        res?.data?.user?.username ||
        usernameInput;
      setUsername(uname);
      localStorage.setItem("username", uname);

      nav("/posts");
    } catch (e2) {
      setErr(e2.message || "Registration failed.");
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 49px)",
        display: "grid",
        placeItems: "center",
        padding: "1rem",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          display: "grid",
          gap: ".6rem",
          width: "min(420px, 92vw)",
          border: "1px solid #ccc",
          padding: "1rem",
          background: "#fff",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Register</h2>
        <input
          placeholder="username"
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          autoFocus
        />
        <div style={{ position: "relative" }}>
          <input
            placeholder="password"
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", paddingRight: "2.25rem" }}
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            aria-label={showPw ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: 6,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
            }}
            title={showPw ? "Hide" : "Show"}
          >
            {showPw ? "🙈" : "👁"}
          </button>
        </div>
        <button type="submit">Register</button>
        {err && <p style={{ color: "crimson", margin: 0 }}>{err}</p>}
      </form>
    </div>
  );
}
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser, fetchUserData } from "../fetching"; // adjust names if different

// export default function Register({ setToken, setUsername }) {
//   const [usernameInput, setUsernameInput] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const nav = useNavigate();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setErr("");

//     try {
//       const res = await registerUser(usernameInput, password);
//       const token = res?.data?.token || res?.token; // handle either shape
//       if (!token) throw new Error("Registration failed.");

//       // instant UI update
//       setToken(token);
//       localStorage.setItem("token", token);

//       // derive username (API may or may not return it)
//       const me = await fetchUserData(token).catch(() => null);
//       const uname =
//         me?.username ||
//         me?.data?.username ||
//         res?.data?.user?.username ||
//         usernameInput;

//       setUsername(uname);
//       localStorage.setItem("username", uname);

//       nav("/posts");
//     } catch (e2) {
//       console.error(e2);
//       setErr(e2.message || "Registration failed.");
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmit}
//       style={{ display: "grid", gap: ".5rem", maxWidth: 480 }}
//     >
//       <input
//         placeholder="username"
//         value={usernameInput}
//         onChange={(e) => setUsernameInput(e.target.value)}
//         autoFocus
//       />
//       <input
//         placeholder="password"
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Register</button>
//       {err && <p style={{ color: "crimson", margin: 0 }}>{err}</p>}
//     </form>
//   );
// }
