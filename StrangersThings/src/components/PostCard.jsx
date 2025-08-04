import { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePost, deletePost, BASE_URL } from "../fetching";

export default function PostCard({ post, token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [message, setMessage] = useState(""); // ✅ new controlled message state

  const nav = useNavigate();
  const loc = useLocation();

  useEffect(() => {
    const postData = post || loc.state?.post;
    if (postData) {
      setTitle(postData.title);
      setDescription(postData.description);
      setPrice(postData.price);
      setLocation(postData.location);
      setWillDeliver(postData.willDeliver);
    }
  }, [post, loc.state]);

  const submitHandler = (e) => {
    e.preventDefault();

    async function editPost() {
      const updatedPost = {
        title,
        description,
        price,
        location,
        willDeliver,
      };
      const editedPost = await updatePost(
        loc.state.post._id,
        updatedPost,
        token
      );
      if (editedPost?.success) {
        alert("Post updated!");
        nav("/posts");
      }
    }

    editPost();
  };

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
          const confirmDelete = window.confirm(
            "Are you sure you want to delete this post?"
          );
          if (confirmDelete) {
            const result = await deletePost(loc.state.post._id, token);
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
      {loc.state.post.isAuthor !== true && (
        <>
          <h2>Send a message to the seller:</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const response = await fetch(
                  `${BASE_URL}/posts/${loc.state.post._id}/messages`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      message: {
                        content: message,
                      },
                    }),
                  }
                );
                const result = await response.json();
                if (result.success) {
                  alert("Message sent!");
                  setMessage(""); // ✅ clear the input after success
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
