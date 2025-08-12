import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

export default function Nav({ token, setToken, messageCount, username }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const nav = useNavigate();

  const handleLogout = () => {
    setToken?.(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    nav("/");
  };

  const onLogin = currentPath === "/login";
  const onRegister = currentPath === "/register";
  const onAuthPage = onLogin || onRegister;

  return (
    <header className="nav-wrapper">
      <div className="nav-inner">
        <Link
          to={token ? "/posts" : "/"}
          className={currentPath.startsWith("/posts") ? "active" : ""}
        >
          Strangers' Things
        </Link>

        <div className="nav-links">
          {!token ? (
            // CHOOSE ONE of the two patterns below:

            // (A) Show only the OTHER link on auth pages:
            <>
              {!onLogin && (
                <Link to="/login" className={onLogin ? "active" : ""}>
                  Login
                </Link>
              )}
              {!onRegister && (
                <Link to="/register" className={onRegister ? "active" : ""}>
                  Register
                </Link>
              )}
            </>
          ) : (
            // (B) Or, hide BOTH links entirely on auth pages:
            // !onAuthPage ? (
            //   <>
            //     <Link to="/login" className={onLogin ? "active" : ""}>Login</Link>
            //     <Link to="/register" className={onRegister ? "active" : ""}>Register</Link>
            //   </>
            // ) : null

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
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "./Nav.css";

// export default function Nav({ token, setToken, messageCount, username }) {
//   const location = useLocation();
//   const currentPath = location.pathname; // ✅ Fix: define currentPath
//   const nav = useNavigate();

//   const handleLogout = () => {
//     setToken(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     nav("/"); // send to landing
//   };

//   return (
//     <header className="nav-wrapper">
//       <div className="nav-inner">
//         {/* Left side */}
//         <Link
//           to={!token ? "/" : "/posts"} // ✅ Goes to landing if logged out
//           className={currentPath.startsWith("/posts") ? "active" : ""}
//         >
//           Strangers' Things
//         </Link>

//         {/* Right side */}
//         <div className="nav-links">
//           {!token ? (
//             <>
//               <Link
//                 to="/login"
//                 className={currentPath === "/login" ? "active" : ""}
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className={currentPath === "/register" ? "active" : ""}
//               >
//                 Register
//               </Link>
//             </>
//           ) : (
//             <>
//               <span>Hello, {username}</span>
//               <Link
//                 to="/messages"
//                 className={currentPath === "/messages" ? "active" : ""}
//               >
//                 Messages {messageCount > 0 && <span>({messageCount})</span>}
//               </Link>
//               <button onClick={handleLogout} className="logout-btn">
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
