import { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { updatePost, deletePost, BASE_URL } from "../fetching";

export default function PostCard({ post: postProp, token }) {
  const { id: paramId } = useParams(); // for direct URL access
  const nav = useNavigate();
  const loc = useLocation();

  const [post, setPost] = useState(postProp || loc.state?.post || null);
  const [loading, setLoading] = useState(!post);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch post if missing (direct link or refresh)
  useEffect(() => {
    if (post) return;
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/posts`);
        const data = await res.json();
        const found = data?.data?.posts?.find(
          (p) => p._id === paramId || p.id === paramId
        );
        if (alive) setPost(found || null);
      } catch (err) {
        if (alive) setError("Failed to load post.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [paramId, post]);

  // Keep form fields in sync
  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setDescription(post.description || "");
      setPrice(post.price || "");
      setLocation(post.location || "");
      setWillDeliver(Boolean(post.willDeliver));
    }
  }, [post]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!post?._id) return;
    const updatedPost = { title, description, price, location, willDeliver };
    const editedPost = await updatePost(post._id, updatedPost, token);
    if (editedPost?.success) {
      alert("Post updated!");
      nav("/posts");
    }
  };

  if (loading) return <p>Loading post…</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <Fragment>
      <h1>Update Your Post</h1>
      <form onSubmit={submitHandler}>
        <input
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>
          Will Deliver?
          <input
            type="checkbox"
            checked={willDeliver}
            onChange={(e) => setWillDeliver(e.target.checked)}
          />
        </label>
        <button type="submit">Update</button>
      </form>

      <button
        onClick={async () => {
          if (!post?._id) return;
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
          );
          if (confirmDelete) {
            const result = await deletePost(post._id, token);
            if (result?.success) {
              alert("Post deleted successfully!");
              nav("/posts");
            } else {
              alert("Failed to delete post.");
            }
          }
        }}
      >
        Delete
      </button>

      <button onClick={() => nav(`/posts`)}>Back</button>

      {/* Messaging form for non-authors */}
      {post.isAuthor !== true && (
        <>
          <h2>Send a message to the seller:</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const response = await fetch(
                  `${BASE_URL}/posts/${post._id}/messages`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ message: { content: message } }),
                  }
                );
                const result = await response.json();
                if (result.success) {
                  alert("Message sent!");
                  setMessage("");
                } else {
                  alert("Message failed.");
                }
              } catch (error) {
                console.error("Error sending message:", error);
              }
            }}
          >
            <textarea
              name="message"
              rows="4"
              cols="50"
              placeholder="Write your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <br />
            <button type="submit" disabled={!message.trim()}>
              Send Message
            </button>
          </form>
        </>
      )}
    </Fragment>
  );
}
