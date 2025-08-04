import { useState } from "react";
import { registerUser } from "../fetching";
import { useNavigate } from "react-router-dom";

export default function Register({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // clear old errors

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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
