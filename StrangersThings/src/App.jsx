import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import PostsList from "./components/PostsList";
import PostCard from "./components/PostCard";
import Messages from "./components/Messages";
import Nav from "./components/Nav";
import Landing from "./components/Landing";
import "./App.css";
import { fetchUserData } from "./fetching";

export default function App() {
  const [token, setToken] = useState(null);
  const [messageCount, setMessageCount] = useState(0); // received-only count
  const [username, setUsername] = useState("");
  const location = useLocation();

  const hideNav = location.pathname === "/";

  // Load token/username from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken) setToken(storedToken);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  // Keep the Nav badge in sync with RECEIVED messages only
  useEffect(() => {
    if (!token) {
      setMessageCount(0);
      return;
    }
    (async () => {
      try {
        const data = await fetchUserData(token); // /users/me
        setUsername(data.username || "");
        const all = data.messages || [];
        const received = all.filter((m) => {
          if (typeof m.fromUser === "boolean") return !m.fromUser; // false => received
          if (m.fromUser?.username)
            return m.fromUser.username !== data.username;
          return true; // if shape unknown, assume received
        });
        setMessageCount(received.length);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    })();
  }, [token]); // only when auth changes

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
        <Route path="/" element={<Landing />} />
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
        {/* Messages now fetches its own data using token */}
        <Route path="/messages" element={<Messages token={token} />} />
        <Route path="*" element={<Navigate to="/posts" replace />} />
      </Routes>
    </>
  );
}
