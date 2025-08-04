import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Messages({ token }) {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
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
          setMessages(result.data.messages);
          setUsername(result.data.username); // Save current user's name
        } else {
          console.error("No messages found in response", result);
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    if (token) {
      fetchMessages();
    }
  }, [token]);

  const filteredMessages = messages.filter(
    (msg) => msg.fromUser?.username !== username
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontFamily: "sans-serif", color: "#333" }}>📬 Your Inbox</h1>
      {filteredMessages.length === 0 ? (
        <p style={{ color: "#888", fontStyle: "italic" }}>
          No messages from other users yet.
        </p>
      ) : (
        filteredMessages.map((message) => (
          <div
            key={message._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p>
              <strong>From:</strong> {message.fromUser?.username}
            </p>
            <p>
              <strong>Post:</strong> {message.post?.title}
            </p>
            <p>
              <strong>Message:</strong> {message.content}
            </p>
            <button
              onClick={() =>
                nav(`/post/${message.post._id}`, {
                  state: { post: message.post },
                })
              }
              style={{
                marginTop: "0.5rem",
                backgroundColor: "#ff7aa2",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Reply ✍️
            </button>
          </div>
        ))
      )}
    </div>
  );
}
