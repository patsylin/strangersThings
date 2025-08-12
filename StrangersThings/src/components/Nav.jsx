import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

export default function Nav({ token, setToken, messageCount, username }) {
  const location = useLocation();
  const currentPath = location.pathname; // ✅ Fix: define currentPath
  const nav = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    nav("/"); // send to landing
  };

  return (
    <header className="nav-wrapper">
      <div className="nav-inner">
        {/* Left side */}
        <Link
          to={!token ? "/" : "/posts"} // ✅ Goes to landing if logged out
          className={currentPath.startsWith("/posts") ? "active" : ""}
        >
          Strangers' Things
        </Link>

        {/* Right side */}
        <div className="nav-links">
          {!token ? (
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
          ) : (
            <>
              <span>Hello, {username}</span>
              <Link
                to="/messages"
                className={currentPath === "/messages" ? "active" : ""}
              >
                Messages {messageCount > 0 && <span>({messageCount})</span>}
              </Link>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
