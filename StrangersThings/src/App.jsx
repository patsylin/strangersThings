import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import PostsList from "./components/PostsList";
import PostCard from "./components/PostCard";
import Messages from "./components/Messages";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const [username, setUsername] = useState("");
  const location = useLocation();

  // Load token and username from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Fetch messages and set username
  useEffect(() => {
    const fetchMessages = async () => {
      if (!token) return;

      try {
        const response = await fetch(
          "https://strangers-things.herokuapp.com/api/2306-GHP-ET-WEB-FT/users/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();

        if (result?.data?.messages) {
          const user = result.data.username;
          setUsername(user);
          localStorage.setItem("username", user);

          const filteredMessages = result.data.messages.filter(
            (msg) => msg.fromUser?.username !== user
          );
          setMessageCount(filteredMessages.length);
        }
      } catch (err) {
        console.error("Error fetching message count:", err);
      }
    };

    fetchMessages();
  }, [token]);

  // Reset message count when visiting the /messages page
  useEffect(() => {
    if (location.pathname === "/messages") {
      setMessageCount(0);
    }
  }, [location]);

  return (
    <>
      <Nav token={token} messageCount={messageCount} username={username} />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/post/:postId" element={<PostCard token={token} />} />
        <Route path="/posts" element={<PostsList token={token} />} />
        <Route path="/messages" element={<Messages token={token} />} />
      </Routes>
    </>
  );
}
