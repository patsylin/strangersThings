import { useState, useEffect } from "react";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  BrowserRouter,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import PostsList from "./components/PostsList";
import PostCard from "./components/PostCard";
import Messages from "./components/Messages";
import Nav from "./components/Nav";
import Landing from "./components/Landing"; // NEW
import "./App.css";
import { fetchUserData } from "./fetching";

function AppShell() {
  const [token, setToken] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const location = useLocation();

  // Hide Nav on splash page
  const hideNav = location.pathname === "/";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken) setToken(storedToken);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  useEffect(() => {
    async function getMessages() {
      if (!token) return;
      try {
        const data = await fetchUserData(token);
        setUsername(data.username);
        setMessages(data.messages);
        setMessageCount(data.messages.length || 0);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }
    getMessages();
  }, [token, location]);

  return (
    <>
      {!hideNav && (
        <Nav
          token={token}
          setToken={setToken}
          messageCount={messageCount}
          username={username}
        />
      )}

      <Routes>
        {/* Splash */}
        <Route path="/" element={<Landing />} />

        {/* App home */}
        <Route path="/posts" element={<PostsList token={token} />} />

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

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/posts" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
