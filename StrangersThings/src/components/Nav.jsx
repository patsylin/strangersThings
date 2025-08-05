import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = ({ token, messageCount, username }) => {
  return (
    <header className="navbar">
      <h1 className="site-title">Strangers' Things</h1>
      <nav className="nav-links">
        {!token ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/posts">See All Posts</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/posts">See All Posts</Link>
            <Link to="/messages">
              Messages{" "}
              {messageCount > 0 && (
                <span
                  style={{
                    backgroundColor: "#ff7aa2",
                    color: "white",
                    borderRadius: "50%",
                    padding: "0.2em 0.6em",
                    fontSize: "0.8em",
                    marginLeft: "0.4em",
                    transition: "all 0.2s ease-in-out", // 💫 animation
                    display: "inline-block",
                    transform: messageCount > 0 ? "scale(1)" : "scale(0.8)", // subtle bounce
                  }}
                >
                  {messageCount}
                </span>
              )}
            </Link>

            {/* 🌟 Cute username badge */}
            <span
              style={{
                marginLeft: "1rem",
                fontFamily: "monospace",
                color: "#444",
                backgroundColor: "#eee",
                padding: "0.2em 0.6em",
                borderRadius: "12px",
                fontSize: "0.85rem",
              }}
            >
              ★ {username}
            </span>
          </>
        )}
      </nav>
    </header>
  );
};

export default Nav;
