import { Link, useLocation } from "react-router-dom";
import "./Nav.css";

const Nav = ({ token, messageCount, username, setToken }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <header className="navbar">
      <h1 className="site-title">Strangers' Things</h1>
      <nav className="nav-links">
        {!token ? (
          <>
            {currentPath !== "/" && <Link to="/">Home</Link>}
            {currentPath !== "/posts" && <Link to="/posts">See All Posts</Link>}
            {currentPath !== "/login" && <Link to="/login">Login</Link>}
            {currentPath !== "/register" && (
              <Link to="/register">Register</Link>
            )}
          </>
        ) : (
          <>
            {currentPath !== "/posts" && <Link to="/posts">See All Posts</Link>}
            {currentPath !== "/messages" && (
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
                      transition: "all 0.2s ease-in-out",
                      display: "inline-block",
                      transform: messageCount > 0 ? "scale(1)" : "scale(0.8)",
                    }}
                  >
                    {messageCount}
                  </span>
                )}
              </Link>
            )}
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
            <button
              onClick={handleLogout}
              style={{
                marginLeft: "1rem",
                backgroundColor: "#eee",
                border: "1px solid #ccc",
                padding: "0.4em 0.8em",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Nav;
