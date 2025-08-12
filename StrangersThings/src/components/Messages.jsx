import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Messages({
  token,
  messages: messagesProp = [],
  username: usernameProp = "",
}) {
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [fetchedUsername, setFetchedUsername] = useState("");
  const [loading, setLoading] = useState(!!token);
  const [error, setError] = useState("");
  const [showReplyForm, setShowReplyForm] = useState({});
  const [replyContent, setReplyContent] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    document.title = "Messages — Strangers' Things";
  }, []);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          "https://strangers-things.herokuapp.com/api/2306-GHP-ET-WEB-FT/users/me",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await res.json();
        if (result?.data) {
          setFetchedMessages(result.data.messages || []);
          setFetchedUsername(result.data.username || "");
        } else {
          setError("Could not load messages.");
        }
      } catch (e) {
        console.error(e);
        setError("Could not load messages.");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const username = token ? fetchedUsername : usernameProp;
  const allMessages = token ? fetchedMessages : messagesProp;

  const receivedMessages = useMemo(() => {
    return (allMessages || []).filter((m) => {
      if (typeof m.fromUser === "boolean") return !m.fromUser;
      if (m.fromUser?.username) return m.fromUser.username !== username;
      return true;
    });
  }, [allMessages, username]);

  const handleToggleReply = (id) =>
    setShowReplyForm((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleSendReply = async (rawPostId, messageId) => {
    if (!token) {
      nav("/login");
      return;
    }

    const postId = String(rawPostId || "").trim();
    const content = replyContent[messageId]?.trim();

    if (!postId) {
      setSuccessMessage("");
      setError("Missing post id for reply.");
      return;
    }
    if (!content) {
      setSuccessMessage("");
      setError("Write a message before sending.");
      return;
    }

    try {
      setError("");
      const res = await fetch(
        `https://strangers-things.herokuapp.com/api/2306-GHP-ET-WEB-FT/posts/${postId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: { content } }),
        }
      );
      const data = await res.json();

      if (!res.ok || !data?.success) {
        const apiMsg = data?.error?.message || data?.error || res.statusText;
        setError(apiMsg || "Failed to send reply.");
        console.error("Reply failed:", {
          status: res.status,
          apiMsg,
          data,
          postId,
        });
        return;
      }

      setSuccessMessage("Reply sent!");
      setShowReplyForm((p) => ({ ...p, [messageId]: false }));
      setReplyContent((p) => ({ ...p, [messageId]: "" }));
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (e) {
      console.error(e);
      setError("Network error sending reply.");
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "1rem" }}>
      <h1 style={{ margin: 0, fontSize: "1.1rem" }}>Your Inbox</h1>

      {loading && (
        <p style={{ color: "#555", marginTop: ".75rem" }}>Loading messages…</p>
      )}
      {error && !loading && (
        <p style={{ color: "crimson", marginTop: ".75rem" }}>{error}</p>
      )}
      {successMessage && !loading && (
        <p style={{ color: "green", marginTop: ".75rem" }}>{successMessage}</p>
      )}

      {!loading && !error && (
        <>
          {receivedMessages.length === 0 ? (
            <p
              style={{
                color: "#555",
                fontStyle: "italic",
                marginTop: ".75rem",
              }}
            >
              No messages from other users yet.
            </p>
          ) : (
            receivedMessages.map((message) => (
              <div
                key={message._id}
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  background: "#fff",
                  marginTop: ".75rem",
                }}
              >
                <p style={{ margin: 0 }}>
                  <strong>From:</strong>{" "}
                  {message.fromUser?.username || "Someone"}
                </p>
                <p style={{ margin: ".25rem 0 0" }}>
                  <strong>Post:</strong>{" "}
                  {message.post?.title || "(deleted post)"}
                </p>
                <p style={{ margin: ".5rem 0 0", whiteSpace: "pre-wrap" }}>
                  <strong>Message:</strong> {message.content}
                </p>

                <button
                  onClick={() => handleToggleReply(message._id)}
                  style={{
                    marginTop: ".6rem",
                    background: "#fff",
                    border: "1px solid #ccc",
                    padding: ".4rem .7rem",
                    cursor: "pointer",
                  }}
                >
                  {showReplyForm[message._id] ? "Cancel" : "Reply"}
                </button>

                {showReplyForm[message._id] && (
                  <div style={{ marginTop: ".6rem" }}>
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
                        padding: ".5rem .6rem",
                        border: "1px solid #ccc",
                        resize: "vertical",
                      }}
                    />
                    <button
                      onClick={() =>
                        handleSendReply(message.post._id, message._id)
                      }
                      style={{
                        marginTop: ".5rem",
                        background: "#fff",
                        border: "1px solid #ccc",
                        padding: ".4rem .7rem",
                        cursor: "pointer",
                      }}
                    >
                      Send Reply
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
