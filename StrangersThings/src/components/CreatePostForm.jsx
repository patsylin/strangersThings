import { useState, useRef, useEffect } from "react";
import { fetchPosts, makePost } from "../fetching";

export default function CreatePostForm({ setPosts, token }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
    titleRef.current?.select();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setLocation("");
    setWillDeliver(false);
    requestAnimationFrame(() => {
      titleRef.current?.focus();
      titleRef.current?.select();
    });
  };

  const submitHandler = async (e) => {
    e?.preventDefault?.();
    setErr("");
    setOk("");

    if (!token) return setErr("You must be logged in to create a post.");
    if (!title.trim()) return setErr("Title is required.");

    try {
      setSubmitting(true);

      const payload = {
        title: title.trim(),
        description: description.trim(),
        price: price.trim(),
        willDeliver,
        ...(location.trim() ? { location: location.trim() } : {}),
      };

      const result = await makePost(payload, token);
      if (result?.error)
        throw new Error(result.error.message || "Failed to create post.");

      const latest = await fetchPosts();
      const postsArray = Array.isArray(latest)
        ? latest
        : latest?.data?.posts ?? [];
      if (!Array.isArray(postsArray))
        throw new Error("Unexpected posts response.");

      setPosts(postsArray);
      setOk("Post created!");
      resetForm();
    } catch (e2) {
      console.error(e2);
      setErr(e2.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const isTextarea = e.target.tagName.toLowerCase() === "textarea";
    if (isTextarea && e.shiftKey) return; // allow newline
    e.preventDefault();
    submitHandler(e);
  };

  return (
    <form
      onSubmit={submitHandler}
      onKeyDown={handleKeyDown}
      style={{ display: "grid", gap: ".5rem", maxWidth: 960 }}
    >
      <input
        ref={titleRef}
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={(e) => e.target.select()}
      />
      <textarea
        placeholder="description (Shift+Enter for newline)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        style={{
          resize: "vertical",
          minHeight: "4.5rem",
          padding: ".5rem .6rem",
        }}
      />
      <input
        placeholder="price (e.g. $25)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        placeholder="location (optional)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <label
        style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}
      >
        <input
          type="checkbox"
          checked={willDeliver}
          onChange={(e) => setWillDeliver(e.target.checked)}
        />
        Will Deliver?
      </label>

      <button
        type="submit"
        disabled={submitting}
        style={{ cursor: submitting ? "not-allowed" : "pointer" }}
      >
        {submitting ? "Creating…" : "Create Post"}
      </button>

      {err && <p style={{ color: "crimson", margin: 0 }}>{err}</p>}
      {ok && <p style={{ color: "green", margin: 0 }}>{ok}</p>}
    </form>
  );
}
