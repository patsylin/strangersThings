import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Messages({ token }) {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [showReplyForm, setShowReplyForm] = useState({});
  const [replyContent, setReplyContent] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
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
          setUsername(result.data.username);
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

  <button onClick={() => handleToggleReply(message._id)}>
    {showReplyForm[message._id] ? "Cancel Reply" : "Reply"}
  </button>;

  {
    showReplyForm[message._id] && (
      <div>
        <textarea
          rows="3"
          value={replyContent[message._id] || ""}
          onChange={(e) =>
            setReplyContent((prev) => ({
              ...prev,
              [message._id]: e.target.value,
            }))
          }
          placeholder="Write your reply..."
        />
        <button onClick={() => handleSendReply(message.post._id, message._id)}>
          Send Reply
        </button>
      </div>
    );
  }

  const handleSendReply = async (postId, messageId) => {
    try {
      const response = await fetch(
        `https://strangers-things.herokuapp.com/api/2306-GHP-ET-WEB-FT/posts/${postId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: {
              content: replyContent[messageId],
            },
          }),
        }
      );
      const result = await response.json();
      if (result?.success) {
        setSuccessMessage("Reply sent!");
        setShowReplyForm((prev) => ({ ...prev, [messageId]: false }));
        setReplyContent((prev) => ({ ...prev, [messageId]: "" }));
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        console.error("Failed to send reply", result);
      }
    } catch (err) {
      console.error("Error sending reply:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ fontFamily: "sans-serif", color: "#333" }}>📬 Your Inbox</h1>
      {successMessage && (
        <p style={{ color: "green", marginBottom: "1rem" }}>{successMessage}</p>
      )}
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
              onClick={() => handleToggleReply(message._id)}
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
              {showReplyForm[message._id] ? "Cancel" : "Reply ✍️"}
            </button>

            {showReplyForm[message._id] && (
              <div style={{ marginTop: "1rem" }}>
                <textarea
                  rows={3}
                  placeholder="Write your reply..."
                  value={replyContent[message._id] || ""}
                  onChange={(e) =>
                    setReplyContent((prev) => ({
                      ...prev,
                      [message._id]: e.target.value,
                    }))
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    marginBottom: "0.5rem",
                  }}
                />
                <button
                  onClick={() => handleSendReply(message.post._id, message._id)}
                  style={{
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Send Reply 💌
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
