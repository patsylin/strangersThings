import { useEffect, useState, useMemo } from "react";
import Post from "./Post";
import CreatePostForm from "./CreatePostForm";
import { fetchPosts } from "../fetching";

export default function PostsList({ token }) {
  const [allPosts, setAllPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function getPosts() {
    try {
      setLoading(true);
      setErr("");
      const p = await fetchPosts(); // expect array, but normalize either way
      const postsArray = Array.isArray(p) ? p : p?.data?.posts ?? [];
      if (!Array.isArray(postsArray)) {
        console.warn("Unexpected post data:", p);
        setAllPosts([]);
      } else {
        setAllPosts(postsArray);
      }
    } catch (e) {
      console.error("Error fetching posts:", e);
      setErr("Could not load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  const visiblePosts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return allPosts;
    return allPosts.filter((post) => {
      const title = post.title?.toLowerCase() ?? "";
      const desc = post.description?.toLowerCase() ?? "";
      const author = post.author?.username?.toLowerCase() ?? "";
      return title.includes(q) || desc.includes(q) || author.includes(q);
    });
  }, [allPosts, searchTerm]);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".75rem",
          marginBottom: ".75rem",
        }}
      >
        <input
          placeholder="search title/description/author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: ".5rem .6rem", border: "1px solid #ccc" }}
        />
        <button
          onClick={() => setSearchTerm("")}
          style={{
            padding: ".5rem .75rem",
            border: "1px solid #ccc",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      {token && (
        <div style={{ marginBottom: "1rem" }}>
          <CreatePostForm
            setPosts={(newList) => setAllPosts(newList)}
            token={token}
          />
        </div>
      )}

      {loading && <p>Loading posts…</p>}
      {err && !loading && <p>{err}</p>}

      {!loading && !err && visiblePosts.length === 0 && (
        <div>
          <p>No posts found.</p>
          <button
            onClick={getPosts}
            style={{
              padding: ".4rem .7rem",
              border: "1px solid #ccc",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      )}

      {!loading && !err && visiblePosts.length > 0 && (
        <div style={{ display: "grid", gap: ".75rem" }}>
          {visiblePosts.map((post) => (
            <Post key={post._id || post.id} post={post} token={token} />
          ))}
        </div>
      )}
    </div>
  );
}
