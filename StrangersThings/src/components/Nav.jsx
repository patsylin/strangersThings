import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to="/posts">See all posts</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}
