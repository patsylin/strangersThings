import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = ({ token, setToken, messageCount = 0, username }) => {
  const location = useLocation();
  const nav = useNavigate();

  const handleLogout = () => {
    setToken?.(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    nav("/posts");
  };

  return (
    <nav
      className="nav-container"
      style={{ borderBottom: "1px solid #e5e5e5" }}
    >
      <div
        className="nav-links"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.75rem 1rem",
        }}
      >
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link
            to="/posts"
            className={location.pathname.startsWith("/posts") ? "active" : ""}
          >
            Strangers' Things
          </Link>

          {token ? (
            <Link
              to="/messages"
              className={location.pathname === "/messages" ? "active" : ""}
            >
              Messages {messageCount > 0 && <span>({messageCount})</span>}
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={location.pathname === "/login" ? "active" : ""}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={location.pathname === "/register" ? "active" : ""}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {token && (
          <div style={{ display: "flex", gap: ".75rem", alignItems: "center" }}>
            <span>Hi{username ? `, ${username}` : ""} ✨</span>
            <button onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
