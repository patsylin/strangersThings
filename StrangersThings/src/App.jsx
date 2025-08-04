import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import PostsList from "./components/PostsList";
import PostCard from "./components/PostCard";
import Messages from "./components/Messages";
import Nav from "./components/Nav";
import "./App.css";
import { useLocation } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);
  const [messageCount, setMessageCount] = useState(0);
  const location = useLocation(); // <-- ADD THIS

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

  useEffect(() => {
    if (location.pathname === "/messages") {
      setMessageCount(0); // <-- RESET BADGE HERE
    }
  }, [location]);

  return (
    <>
      <Nav token={token} messageCount={messageCount} />
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
export default App;
