import React from "react";
import { Link } from "react-router-dom";

function Deals() {
  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes droopTag {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(10px) rotate(-5deg);
            }
          }

          @keyframes fallingTear {
            0% {
              opacity: 0;
              transform: translateY(0px) scale(0.6);
            }
            30% {
              opacity: 1;
            }
            80% {
              opacity: 0.9;
              transform: translateY(22px) scale(1);
            }
            100% {
              opacity: 0;
              transform: translateY(30px) scale(0.2);
            }
          }

          @keyframes shadowPulse {
            0%, 100% {
              transform: scaleX(1);
              opacity: 0.4;
            }
            50% {
              transform: scaleX(1.15);
              opacity: 0.2;
            }
          }

          .sad-tag-icon {
            animation: droopTag 3.5s ease-in-out infinite;
            transform-origin: top center;
          }

          .tear-drop {
            animation: fallingTear 2.2s ease-in-out infinite;
          }

          .shadow-glow {
            animation: shadowPulse 3.5s ease-in-out infinite;
          }

          .explore-btn:hover {
            background: linear-gradient(45deg, #ff6666, #e60000) !important;
            box-shadow: 0 6px 20px rgba(255, 77, 77, 0.4) !important;
            transform: translateY(-2px);
          }
        `}
      </style>

      <div style={styles.contentWrapper}>
        {/* Page Header */}
        <div style={styles.header}>
          <Link to="/" style={styles.backLink}>
            ← Back to Home
          </Link>
          <div style={styles.logoHeader}>
            <span style={styles.logoText}>
              E-<span style={{ color: "#ff4d4d" }}>Shop</span>
            </span>
          </div>
          <h1 style={styles.title}>Exclusive Deals & Offers</h1>
          <p style={styles.subtitle}>
            Limited-time discounts, flash sales, and special promo offers.
          </p>
        </div>
        <div style={styles.card}>
          <div style={styles.animationContainer}>
            <svg
              width="140"
              height="140"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sad-tag-icon"
            >
              <path
                d="M15 25C15 19.4772 19.4772 15 25 15H52.5858C55.2378 15 57.7812 16.0536 59.6569 17.9289L82.0711 40.3431C85.9763 44.2484 85.9763 50.5801 82.0711 54.4853L59.4853 77.0711C55.5801 80.9763 49.2484 80.9763 45.3431 77.0711L22.9289 54.6569C21.0536 52.7812 20 50.2378 20 47.5858V30C20 27.2386 17.7614 25 15 25Z"
                fill="#181820"
                stroke="#ff4d4d"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Tag Hole */}
              <circle
                cx="32"
                cy="30"
                r="4.5"
                fill="#050507"
                stroke="#ff4d4d"
                strokeWidth="2.5"
              />
              <path
                d="M42 48 L48 52"
                stroke="#a1a1aa"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M68 48 L62 52"
                stroke="#a1a1aa"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M45 66 C 50 58, 60 58, 65 66"
                stroke="#ff4d4d"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />

              <path
                className="tear-drop"
                d="M 43 56 C 41 59, 41 62, 43 64 C 45 64, 45 61, 43 56 Z"
                fill="#60a5fa"
              />
            </svg>

            <div style={styles.shadow} className="shadow-glow" />
          </div>

          <h2 style={styles.emptyTitle}>No Active Deals Right Now</h2>
          <p style={styles.emptyText}>
            Looks like all our promotional discounts and flash sales have
            expired for today. Our team is cooking up new price drops—check back
            soon!
          </p>

          <div style={styles.actionGroup}>
            <Link to="/shop" style={styles.exploreBtn} className="explore-btn">
              Explore All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    backgroundColor: "#050507",
    color: "#ffffff",
    padding: "40px 5%",
    display: "flex",
    justifyContent: "center",
  },
  contentWrapper: {
    width: "100%",
    maxWidth: "850px",
  },
  header: {
    marginBottom: "30px",
  },
  backLink: {
    color: "#ff4d4d",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    display: "inline-block",
    marginBottom: "15px",
  },
  logoHeader: {
    marginBottom: "10px",
  },
  logoText: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#fff",
    letterSpacing: "1px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "800",
    margin: "0 0 10px 0",
    color: "#fff",
    letterSpacing: "0.5px",
  },
  subtitle: {
    color: "#a1a1aa",
    fontSize: "15px",
    margin: 0,
  },
  card: {
    backgroundColor: "#101014",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    padding: "60px 30px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  animationContainer: {
    position: "relative",
    marginBottom: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  shadow: {
    width: "70px",
    height: "10px",
    backgroundColor: "rgba(255, 77, 77, 0.25)",
    borderRadius: "50%",
    marginTop: "10px",
    filter: "blur(4px)",
  },
  emptyTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
    margin: "0 0 12px 0",
  },
  emptyText: {
    fontSize: "15px",
    color: "#a1a1aa",
    maxWidth: "480px",
    lineHeight: "1.6",
    margin: "0 0 30px 0",
  },
  actionGroup: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  exploreBtn: {
    background: "linear-gradient(45deg, #ff4d4d, #cc0000)",
    color: "#ffffff",
    textDecoration: "none",
    padding: "12px 28px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "15px",
    transition: "all 0.2s ease",
    boxShadow: "0 4px 15px rgba(255, 77, 77, 0.25)",
    display: "inline-block",
  },
};

export default Deals;
