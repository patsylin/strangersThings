import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchUserData } from "../fetching";

export default function Login({ setToken, setUsername }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false); // 👁 toggle
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await loginUser(usernameInput, password);
      const token = res?.data?.token || res?.token;
      if (!token) throw new Error("Login failed.");
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
      setErr(e2.message || "Login failed.");
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
        <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Login</h2>
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
        <button type="submit">Login</button>
        {err && <p style={{ color: "crimson", margin: 0 }}>{err}</p>}
      </form>
    </div>
  );
}
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser, fetchUserData } from "../fetching"; // adjust names if different

// export default function Login({ setToken, setUsername }) {
//   const [usernameInput, setUsernameInput] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const nav = useNavigate();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setErr("");

//     try {
//       const res = await loginUser(usernameInput, password);
//       const token = res?.data?.token || res?.token; // handle either shape
//       if (!token) throw new Error("Login failed.");

//       // set state FIRST for instant UI update
//       setToken(token);
//       localStorage.setItem("token", token);

//       // get username (if login API didn’t return it)
//       const me = await fetchUserData(token).catch(() => null);
//       const uname =
//         me?.username ||
//         me?.data?.username ||
//         res?.data?.user?.username ||
//         usernameInput;

//       setUsername(uname);
//       localStorage.setItem("username", uname);

//       nav("/posts"); // jump right into the app
//     } catch (e2) {
//       console.error(e2);
//       setErr(e2.message || "Login failed.");
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
//       <button type="submit">Login</button>
//       {err && <p style={{ color: "crimson", margin: 0 }}>{err}</p>}
//     </form>
//   );
// }
