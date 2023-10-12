import { useNavigate } from "react-router-dom";

export default function Post({ post, token }) {
  const nav = useNavigate();

  return (
    <div onClick={() => nav(`/post/${post._id}`, { state: { post, token } })}>
      <h4>{post.title}</h4>
      <p>Description: {post.description}</p>
      <p>Price: ${post.price}</p>
      <p>Location: {post.location}</p>
      <p>Delivery available?: {post.willDeliver}</p>
    </div>
  );
}
