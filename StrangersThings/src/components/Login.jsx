import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, fetchUserData } from "../fetching"; // adjust names if different

export default function Login({ setToken, setUsername }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await loginUser(usernameInput, password);
      const token = res?.data?.token || res?.token; // handle either shape
      if (!token) throw new Error("Login failed.");

      // set state FIRST for instant UI update
      setToken(token);
      localStorage.setItem("token", token);

      // get username (if login API didn’t return it)
      const me = await fetchUserData(token).catch(() => null);
      const uname =
        me?.username ||
        me?.data?.username ||
        res?.data?.user?.username ||
        usernameInput;

      setUsername(uname);
      localStorage.setItem("username", uname);

      nav("/posts"); // jump right into the app
    } catch (e2) {
      console.error(e2);
      setErr(e2.message || "Login failed.");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "grid", gap: ".5rem", maxWidth: 480 }}
    >
      <input
        placeholder="username"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
        autoFocus
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {err && <p style={{ color: "crimson", margin: 0 }}>{err}</p>}
    </form>
  );
}
