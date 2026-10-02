import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";

function EmailVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(60);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (otp.length !== 6) {
      setError("System requires a valid 6-digit access token.");
      return;
    }

    setLoading(true);
    try {
      const response = await API.post(
        "/api/auth/verify-otp",
        { email, otp },
        { withCredentials: true },
      );

      if (response.data.success || response.status === 200) {
        setSuccessMessage("🔥 Access Authorized! Redirecting...");

        if (response.data.user || response.data) {
          login(response.data.user || response.data);
        }

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Decryption failed. Invalid or expired token.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;

    setError("");
    setSuccessMessage("");

    try {
      const response = await API.post(
        "/api/auth/resend-otp",
        { email },
        { withCredentials: true },
      );

      if (response.status === 200) {
        setSuccessMessage(
          "📡 A fresh security key has been dispatched to your inbox.",
        );
        setCooldown(60);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to re-route token. Try again shortly.",
      );
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes pulseGlow {
            0% { opacity: 0.25; filter: blur(40px); }
            50% { opacity: 0.5; filter: blur(60px); }
            100% { opacity: 0.25; filter: blur(40px); }
          }
          .cyber-input {
            width: 100%;
            background: rgba(0, 0, 0, 0.5);
            border: 2px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 16px;
            color: #fff;
            font-size: 32px;
            font-weight: 900;
            text-align: center;
            letter-spacing: 10px;
            transition: all 0.3s ease;
            outline: none;
            font-family: monospace;
          }
          .cyber-input:focus {
            border-color: #ff4d4d;
            box-shadow: 0 0 25px rgba(255, 77, 77, 0.25);
            background: rgba(0, 0, 0, 0.8);
          }
          .resend-action-btn {
            background: none;
            border: none;
            color: #ff4d4d;
            font-weight: bold;
            text-decoration: underline;
            padding: 0;
            font-size: 14px;
            transition: color 0.2s;
          }
          .resend-action-btn:hover:not(:disabled) {
            color: #ff9966;
          }
        `}
      </style>

      <div style={styles.pageContainer}>
        <div style={styles.glowOrb} />

        <div style={styles.card}>
          <div style={styles.iconContainer}>🔐</div>

          <h1 style={styles.title}>Identity Verification</h1>
          <p style={styles.subtitle}>
            Enter the 6-digit decryption token sent to <br />
            <span style={styles.highlight}>
              {email || "your registered email"}
            </span>
          </p>

          {error && <div style={styles.errorBox}>⚠️ {error}</div>}
          {successMessage && (
            <div style={styles.successBox}>{successMessage}</div>
          )}

          <form onSubmit={handleVerify} style={styles.form}>
            <input
              type="text"
              maxLength="6"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
              className="cyber-input"
              autoFocus
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitBtn,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "wait" : "pointer",
              }}
            >
              {loading
                ? "Decrypting Security Token..."
                : "Authorize Terminal 🚀"}
            </button>
          </form>

          <div style={styles.footer}>
            <span>Didn't receive the transmission? </span>
            <button
              onClick={handleResend}
              disabled={cooldown > 0}
              className="resend-action-btn"
              style={{
                color: cooldown > 0 ? "#555" : "#ff4d4d",
                cursor: cooldown > 0 ? "not-allowed" : "pointer",
                textDecoration: cooldown > 0 ? "none" : "underline",
              }}
              type="button"
            >
              {cooldown > 0 ? `Retry in ${cooldown}s` : "Resend Code"}
            </button>
          </div>

          <div style={{ marginTop: "25px", textAlign: "center" }}>
            <Link to="/login" style={styles.backLink}>
              ← Return to Login Core
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  pageContainer: {
    background: "#0a0a0c",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    position: "relative",
    overflow: "hidden",
    color: "#fff",
  },
  glowOrb: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(circle, rgba(255,77,77,0.15) 0%, rgba(0,0,0,0) 70%)",
    borderRadius: "50%",
    animation: "pulseGlow 6s infinite",
    pointerEvents: "none",
  },
  card: {
    background: "#141418",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "24px",
    padding: "40px 30px",
    maxWidth: "460px",
    width: "100%",
    boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
    position: "relative",
    zIndex: 1,
  },
  iconContainer: {
    fontSize: "44px",
    textAlign: "center",
    marginBottom: "15px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "900",
    textAlign: "center",
    margin: "0 0 10px 0",
    letterSpacing: "0.5px",
  },
  subtitle: {
    color: "#888",
    fontSize: "14px",
    textAlign: "center",
    lineHeight: "1.6",
    margin: "0 0 30px 0",
  },
  highlight: {
    color: "#ff9966",
    fontWeight: "bold",
    fontFamily: "monospace",
    fontSize: "15px",
  },
  errorBox: {
    background: "rgba(255, 77, 77, 0.08)",
    border: "1px solid rgba(255, 77, 77, 0.3)",
    color: "#ff4d4d",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "13px",
    marginBottom: "22px",
    textAlign: "center",
    fontWeight: "600",
  },
  successBox: {
    background: "rgba(76, 175, 80, 0.08)",
    border: "1px solid rgba(76, 175, 80, 0.3)",
    color: "#4caf50",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "13px",
    marginBottom: "22px",
    textAlign: "center",
    fontWeight: "600",
  },
  form: { display: "flex", flexDirection: "column", gap: "22px" },
  submitBtn: {
    background: "linear-gradient(45deg, #ff4d4d, #cc0000)",
    border: "none",
    color: "#fff",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    boxShadow: "0 10px 25px rgba(255,77,77,0.3)",
    transition: "transform 0.2s",
  },
  footer: {
    marginTop: "30px",
    textAlign: "center",
    fontSize: "13px",
    color: "#777",
  },
  backLink: {
    color: "#555",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: "600",
    transition: "color 0.2s",
  },
};

export default EmailVerification;
