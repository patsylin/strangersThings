import { useState } from "react";
import { registerUser } from "../fetching";
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const isLongEnough = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const noSpaces = !/\s/.test(password);

    if (!isLongEnough || !hasNumber || !noSpaces) {
      setErrorMessage(
        "Password must be at least 8 characters, include a number, and contain no spaces."
      );
      return;
    }

    const register = await registerUser(username, password);

    if (!register?.success) {
      setErrorMessage(register?.error?.message || "Registration failed");
      return;
    }

    setToken(register.data.token);
    setUsername("");
    setPassword("");
    nav("/posts");
  };

  return (
    <>
      <h1>Register</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <input
          placeholder="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div style={{ position: "relative" }}>
          <input
            placeholder="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", paddingRight: "2rem" }}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "1.1em",
              userSelect: "none",
            }}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit">Submit</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  );
}
