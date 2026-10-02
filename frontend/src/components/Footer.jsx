import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <style>
        {`
          .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 40px; }
          @media (max-width: 850px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 500px) { .footer-grid { grid-template-columns: 1fr !important; } }
        `}
      </style>

      <footer style={styles.footer}>
        <div style={styles.container} className="footer-grid">
          <div>
            <h3 style={styles.brand}>
              E-<span style={{ color: "#ff4d4d" }}>Shop</span>
            </h3>
            <p style={styles.desc}>
              We provide high-grade hardware and digital setups for creators,
              developers, and gamers worldwide. Fast shipping, guaranteed
              quality.
            </p>
          </div>

          <div>
            <h4 style={styles.title}>Explore</h4>
            <ul style={styles.list}>
              <li>
                <Link to="/shop" style={styles.link}>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/Shop/Gaming" style={styles.link}>
                  Gaming Gear
                </Link>
              </li>
              <li>
                <Link to="/Shop/Audio" style={styles.link}>
                  Audio Gear
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={styles.title}>Legal & Support</h4>
            <ul style={styles.list}>
              <li>
                <Link to="/privacy" style={styles.link}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" style={styles.link}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" style={styles.link}>
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={styles.title}>Stay in the Loop</h4>
            <p style={styles.desc}>
              Subscribe to get notified about secret drops and flash discounts.
            </p>
            <div style={styles.inputGroup}>
              <input
                type="email"
                placeholder="Enter your email"
                style={styles.input}
              />
              <button style={styles.btn}>Join</button>
            </div>
          </div>
        </div>

        <div style={styles.bottomBar}>
          <p>
            &copy; {new Date().getFullYear()} E-Shop Technologies Inc. Built
            with MERN Stack.
          </p>
        </div>
      </footer>
    </>
  );
}

const styles = {
  footer: {
    background: "#0a0a0c",
    color: "#888",
    padding: "70px 5% 30px 5%",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    marginTop: "auto",
  },
  container: { maxWidth: "1400px", margin: "0 auto" },
  brand: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "800",
    margin: "0 0 15px 0",
  },
  desc: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#777",
    margin: "0 0 15px 0",
  },
  title: {
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: "0 0 20px 0",
  },
  list: { listStyle: "none", padding: 0, margin: 0 },
  link: {
    color: "#888",
    textDecoration: "none",
    fontSize: "14px",
    display: "block",
    marginBottom: "12px",
    transition: "color 0.2s",
  },
  inputGroup: { display: "flex", marginTop: "10px" },
  input: {
    background: "#141418",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "12px 15px",
    color: "#fff",
    borderRadius: "6px 0 0 6px",
    outline: "none",
    width: "100%",
    fontSize: "14px",
  },
  btn: {
    background: "#ff4d4d",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "0 6px 6px 0",
    fontWeight: "bold",
    cursor: "pointer",
  },
  bottomBar: {
    textAlign: "center",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    marginTop: "50px",
    paddingTop: "25px",
    fontSize: "13px",
    color: "#555",
  },
};

export default Footer;
