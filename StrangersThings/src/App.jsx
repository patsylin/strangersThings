import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import PostsList from "./components/PostsList";
import PostCard from "./components/PostCard";
import Messages from "./components/Messages";
import Nav from "./components/Nav";
import "./App.css";
import { fetchUserData } from "./fetching";

function App() {
  const [token, setToken] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Load token and username from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken) setToken(storedToken);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  // Fetch user messages when token is available
  useEffect(() => {
    async function getMessages() {
      if (!token) return;
      try {
        const data = await fetchUserData(token);
        setUsername(data.username);
        setMessages(data.messages);
        setMessageCount(data.messages.length);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
    getMessages();
  }, [token, location]);

  return (
    <div>
      <img
        src="/monster-homepage.png"
        alt="Demogorgon browsing Strangers' Things"
        className={isHomePage ? "hero-monster" : "mini-monster"}
      />

      <h1 className={isHomePage ? "homepage-title" : "header-title"}>
        Strangers' Things
      </h1>

      <Nav token={token} setToken={setToken} messageCount={messageCount} />

      <Routes>
        <Route path="/" element={<PostsList token={token} />} />
        <Route
          path="/register"
          element={<Register setToken={setToken} setUsername={setUsername} />}
        />
        <Route
          path="/login"
          element={<Login setToken={setToken} setUsername={setUsername} />}
        />
        <Route path="/post/:postId" element={<PostCard token={token} />} />
        <Route
          path="/messages"
          element={<Messages messages={messages} username={username} />}
        />
      </Routes>
    </div>
  );
}

export default App;

// import { useState, useEffect } from "react";
// import { Route, Routes, useLocation } from "react-router-dom";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import PostsList from "./components/PostsList";
// import PostCard from "./components/PostCard";
// import Messages from "./components/Messages";
// import Nav from "./components/Nav";
// import monsterImage from "./assets/monster-homepage.png";
// import "./App.css";
// import { fetchUserData } from "./fetching";

// function App() {
//   const [token, setToken] = useState(null);
//   const [messageCount, setMessageCount] = useState(0);
//   const [username, setUsername] = useState("");
//   const [messages, setMessages] = useState([]);
//   const location = useLocation();
//   const isHomePage = location.pathname === "/";

//   // Load token and username from localStorage on mount
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUsername = localStorage.getItem("username");
//     if (storedToken) setToken(storedToken);
//     if (storedUsername) setUsername(storedUsername);
//   }, []);

//   // Fetch user messages when token is available
//   useEffect(() => {
//     async function getMessages() {
//       if (!token) return;
//       try {
//         const data = await fetchUserData(token);
//         setUsername(data.username);
//         setMessages(data.messages);
//         setMessageCount(data.messages.length);
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     }
//     getMessages();
//   }, [token, location]);

//   return (
//     <div>
//       <img
//         src={monsterImage}
//         alt="Demogorgon browsing Strangers' Things"
//         className={isHomePage ? "hero-monster" : "mini-monster"}
//       />

//       <h1 className={isHomePage ? "homepage-title" : "header-title"}>
//         Strangers' Things
//       </h1>

//       <Nav token={token} setToken={setToken} messageCount={messageCount} />

//       <Routes>
//         <Route path="/" element={<PostsList token={token} />} />
//         <Route path="/register" element={<Register setToken={setToken} setUsername={setUsername} />} />
//         <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
//         <Route path="/post/:postId" element={<PostCard token={token} />} />
//         <Route path="/messages" element={<Messages messages={messages} username={username} />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
