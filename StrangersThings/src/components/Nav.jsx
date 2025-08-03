import { Link } from "react-router-dom";
import "./Nav.css"; // if you want to keep styling separate

const Nav = () => {
  return (
    <header className="navbar">
      <h1 className="site-title">Strangers' Things</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/posts">See All Posts</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Nav;

// export default function Nav() {
//   return (
//     <nav>
//       <Link to="/posts">See all posts</Link>
//       <Link to="/login">Login</Link>
//       <Link to="/register">Register</Link>
//     </nav>
//   );
// }
