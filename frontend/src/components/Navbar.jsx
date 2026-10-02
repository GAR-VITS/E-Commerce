import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const cartCount = 0;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.1; transform: scale(0.8); }
            50% { opacity: 0.8; transform: scale(1.2); }
            100% { opacity: 0.1; transform: scale(0.8); }
          }
          @keyframes floatStars {
            from { background-position: 0 0, 40px 60px, 130px 270px; }
            to { background-position: -500px 500px, -460px 560px, -370px 770px; }
          }
          @media (max-width: 850px) {
            .nav-content { flex-direction: column !important; gap: 15px !important; }
            .nav-links { gap: 20px !important; flex-wrap: wrap !important; justify-content: center !important; }
            .icon-group { width: 100%; justify-content: center; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); }
          }
        `}
      </style>

      <nav style={styles.navbar}>
        <div style={styles.starLayer} />

        <div style={styles.contentWrapper} className="nav-content">
          <div style={styles.logoContainer}>
            <Link to="/" style={styles.logo}>
              E-
              <span
                style={{
                  color: "#ff4d4d",
                  textShadow: "0 0 12px rgba(255,77,77,0.6)",
                }}
              >
                Shop
              </span>
            </Link>
          </div>

          <ul style={styles.navLinks} className="nav-links">
            <li>
              <Link to="/" style={styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" style={styles.link}>
                Explore
              </Link>
            </li>
            {(!isAuthenticated || user?.role !== "admin") && (
              <li>
                <Link to="/deals" style={styles.link}>
                  Deals
                </Link>
              </li>
            )}
            <li>
              <Link to="/MyOrders" style={styles.link}>
                Orders
              </Link>
            </li>
            {isAuthenticated && user?.role === "admin" && (
              <li>
                <Link to="/admin/dashboard" style={styles.adminLink}>
                  ⚡ Admin Panel
                </Link>
              </li>
            )}
          </ul>

          <div style={styles.iconGroup} className="icon-group">
            <Link to="/cart" style={styles.cartWrapper} title="View Cart">
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
            </Link>

            {isAuthenticated ? (
              <div style={styles.userSection}>
                <Link
                  to="/profile"
                  style={styles.userProfile}
                  title="View Profile"
                >
                  <div style={styles.avatar}>
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span style={styles.username}>{user?.name || "Account"}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  style={styles.logoutBtn}
                  title="Logout"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" style={styles.loginBtn}>
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    minHeight: "80px",
    padding: "15px 5%",
    background: "#050507",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.8)",
    overflow: "hidden",
  },
  starLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    backgroundImage: `
      radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px),
      radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 2px),
      radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 3px)
    `,
    backgroundSize: "450px 450px, 250px 250px, 150px 150px",
    animation:
      "floatStars 50s linear infinite, twinkle 5s ease-in-out infinite",
  },
  contentWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "1400px",
    margin: "0 auto",
    position: "relative",
    zIndex: 1,
  },
  logoContainer: {
    fontSize: "28px",
    fontWeight: "800",
    letterSpacing: "1.5px",
  },
  logo: {
    color: "#fff",
    textDecoration: "none",
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "35px",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#ccc",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    transition: "color 0.2s",
  },
  adminLink: {
    color: "#ff4d4d",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "700",
    background: "rgba(255, 77, 77, 0.1)",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid rgba(255, 77, 77, 0.3)",
    boxShadow: "0 0 10px rgba(255, 77, 77, 0.2)",
    transition: "all 0.2s ease",
  },
  iconGroup: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },
  cartWrapper: {
    color: "#fff",
    display: "flex",
    alignItems: "center",
    position: "relative",
    textDecoration: "none",
    padding: "5px",
  },
  badge: {
    position: "absolute",
    top: "-5px",
    right: "-10px",
    background: "#ff4d4d",
    color: "#fff",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "11px",
    fontWeight: "bold",
    boxShadow: "0 0 8px rgba(255,77,77,0.8)",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  userProfile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #ff4d4d, #990033)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 0 10px rgba(255,77,77,0.3)",
  },
  username: {
    color: "#eee",
    fontSize: "15px",
    fontWeight: "600",
  },
  logoutBtn: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    color: "#aaa",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  loginBtn: {
    background: "linear-gradient(45deg, #ff4d4d, #cc0000)",
    color: "#fff",
    textDecoration: "none",
    padding: "10px 24px",
    borderRadius: "6px",
    fontWeight: "bold",
    boxShadow: "0 4px 15px rgba(255,77,77,0.3)",
  },
};

export default Navbar;
