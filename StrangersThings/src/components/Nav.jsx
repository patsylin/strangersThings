import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = ({ token, setToken, messageCount, username }) => {
  const location = useLocation();
  const nav = useNavigate();

  const currentPath = location.pathname;

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    nav("/"); // redirect to homepage
  };

  return (
    <nav className="nav-container">
      <div className="nav-links">
        {/* Left side: navigation links */}
        <div className="left-nav">
          <Link to="/" className={currentPath === "/" ? "active" : ""}>
            All Posts
          </Link>

          {token ? (
            <Link
              to="/messages"
              className={currentPath === "/messages" ? "active" : ""}
            >
              Messages {messageCount > 0 && <span>({messageCount})</span>}
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className={currentPath === "/login" ? "active" : ""}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={currentPath === "/register" ? "active" : ""}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Right side: username + logout */}
        {token && (
          <div className="right-nav">
            <span className="username-display">⭐ {username}</span>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
