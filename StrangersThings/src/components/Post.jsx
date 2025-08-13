import { useNavigate, Link } from "react-router-dom";

export default function Post({ post, token }) {
  const id = post._id || post.id;
  const rawLoc = (post.location ?? "").trim();
  const showLocation =
    rawLoc &&
    rawLoc !== "[On Request]" &&
    rawLoc.toLowerCase() !== "on request";

  const nav = useNavigate();
  const go = () => nav(`/post/${id}`, { state: { post, token } });

  return (
    <div
      onClick={go}
      style={{
        padding: ".75rem 1rem",
        border: "1px solid #ddd",
        cursor: "pointer",
      }}
    >
      <h4 style={{ margin: 0 }}>
        <Link
          to={`/post/${id}`}
          state={{ post, token }}
          className="post-link"
          onClick={(e) => e.stopPropagation()}
        >
          {post.title}
        </Link>
      </h4>

      {post.price && (
        <p style={{ margin: ".25rem 0 0" }}>Price: {post.price}</p>
      )}
      {showLocation && (
        <p style={{ margin: ".25rem 0 0" }}>Location: {rawLoc}</p>
      )}
      <p style={{ margin: ".5rem 0 0", whiteSpace: "pre-wrap" }}>
        {post.description}
      </p>
      {typeof post.willDeliver === "boolean" && (
        <p style={{ margin: ".25rem 0 0" }}>
          Delivery available?: {post.willDeliver ? "Yes" : "No"}
        </p>
      )}
    </div>
  );
}
