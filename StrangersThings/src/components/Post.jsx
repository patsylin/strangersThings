import { useNavigate } from "react-router-dom";

export default function Post({ post, token }) {
  const nav = useNavigate();
  const go = () =>
    nav(`/post/${post._id || post.id}`, { state: { post, token } });

  const normalizedLocation =
    !post.location ||
    String(post.location).trim().toLowerCase() === "on request"
      ? "public"
      : post.location;

  return (
    <div
      onClick={go}
      style={{
        padding: ".75rem 1rem",
        border: "1px solid #ddd",
        cursor: "pointer",
      }}
    >
      <h4 style={{ margin: 0 }}>{post.title}</h4>
      {post.price && (
        <p style={{ margin: ".25rem 0 0" }}>Price: {post.price}</p>
      )}
      <p style={{ margin: ".25rem 0 0" }}>Location: {normalizedLocation}</p>
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
// import { useNavigate } from "react-router-dom";

// export default function Post({ post, token }) {
//   const nav = useNavigate();
//   const go = () =>
//     nav(`/post/${post._id || post.id}`, { state: { post, token } });

//   return (
//     <div
//       onClick={go}
//       style={{
//         padding: ".75rem 1rem",
//         border: "1px solid #ddd",
//         cursor: "pointer",
//       }}
//     >
//       <h4 style={{ margin: 0 }}>{post.title}</h4>
//       {post.price && (
//         <p style={{ margin: ".25rem 0 0" }}>Price: {post.price}</p>
//       )}
//       {post.location && (
//         <p style={{ margin: ".25rem 0 0" }}>Location: {post.location}</p>
//       )}
//       <p style={{ margin: ".5rem 0 0", whiteSpace: "pre-wrap" }}>
//         {post.description}
//       </p>
//       {typeof post.willDeliver === "boolean" && (
//         <p style={{ margin: ".25rem 0 0" }}>
//           Delivery available?: {post.willDeliver ? "Yes" : "No"}
//         </p>
//       )}
//     </div>
//   );
// }
