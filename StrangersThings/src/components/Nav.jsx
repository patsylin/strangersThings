import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

export default function Nav({ token, setToken, messageCount = 0, username }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const nav = useNavigate();

  const handleLogout = () => {
    setToken?.(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    nav("/");
  };

  const onAuthPage = currentPath === "/login" || currentPath === "/register";

  return (
    <header className="nav-wrapper">
      <div className="nav-inner">
        <Link
          to="/posts"
          className={currentPath.startsWith("/posts") ? "active" : ""}
          aria-current={currentPath.startsWith("/posts") ? "page" : undefined}
        >
          Strangers' Things
        </Link>

        {/* use a real <nav> for a11y */}
        <nav className="nav-links" role="navigation" aria-label="Primary">
          {!token ? (
            !onAuthPage ? (
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
            ) : null
          ) : (
            <>
              <span aria-live="polite">Hello, {username}</span>
              <Link
                to="/messages"
                className={currentPath === "/messages" ? "active" : ""}
              >
                Messages{messageCount > 0 ? ` (${messageCount})` : ""}
              </Link>
              <button
                onClick={handleLogout}
                className="logout-btn"
                aria-label="Log out"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "./Nav.css";

// export default function Nav({ token, setToken, messageCount = 0, username }) {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const nav = useNavigate();

//   const handleLogout = () => {
//     setToken?.(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     nav("/"); // landing after logout
//   };

//   const onAuthPage = currentPath === "/login" || currentPath === "/register";

//   return (
//     <header className="nav-wrapper">
//       <div className="nav-inner">
//         {/* Left: title → posts if logged in, landing if logged out */}
//         <Link
//           to={token ? "/posts" : "/"}
//           className={currentPath.startsWith("/posts") ? "active" : ""}
//         >
//           Strangers' Things
//         </Link>

//         {/* Right */}
//         <div className="nav-links">
//           {!token ? (
//             // OPTION B: hide BOTH links while on /login or /register
//             !onAuthPage ? (
//               <>
//                 <Link
//                   to="/login"
//                   className={currentPath === "/login" ? "active" : ""}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className={currentPath === "/register" ? "active" : ""}
//                 >
//                   Register
//                 </Link>
//               </>
//             ) : null
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
