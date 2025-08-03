import { useNavigate } from "react-router-dom";

export default function Post({ post, token }) {
  const nav = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    nav(`/post/${post._id}`, { state: { post, token } });
  };

  return (
    <div className="post-item">
      <a href={`/post/${post._id}`} onClick={handleClick}>
        {post.title} — ${post.price} ({post.location})
      </a>
      <div style={{ fontSize: "0.9rem", color: "gray" }}>
        {post.willDeliver ? "Delivery available" : "Pickup only"}
      </div>
    </div>
  );
}

// import { useNavigate } from "react-router-dom";

// export default function Post({ post, token }) {
//   const nav = useNavigate();

//   return (
//     <div onClick={() => nav(`/post/${post._id}`, { state: { post, token } })}>
//       <h4>{post.title}</h4>
//       <p>Description: {post.description}</p>
//       <p>Price: ${post.price}</p>
//       <p>Location: {post.location}</p>
//       <p>Delivery available?: {post.willDeliver}</p>
//     </div>
//   );
// }
