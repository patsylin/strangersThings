import { useState } from "react";
import { registerUser } from "../fetching";
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
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

      <form onSubmit={handleSubmit}>
        <input
          placeholder="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="password"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 👁️ Show/hide toggle */}
        <label
          style={{ fontSize: "0.85rem", display: "block", margin: "0.5em 0" }}
        >
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />{" "}
          Show password
        </label>

        <button type="submit">Submit</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  );
}

// import { useState } from "react";
// import { registerUser } from "../fetching";
// import { useNavigate } from "react-router-dom";

// export default function Register({ setToken }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const nav = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(username, password);
//     const register = await registerUser(username, password);
//     setToken(register.data.token);
//     console.log(register);
//     setUsername("");
//     setPassword("");
//     nav("/posts");
//   };

//   return (
//     <>
//       <h1>Register</h1>

//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           placeholder="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// }
