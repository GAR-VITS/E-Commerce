import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import API from "../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true },
      );

      login(res.data);
      if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);

      if (error.response?.data?.isVerified === false) {
        toast.warning(
          "Your account is not verified yet. Redirecting to the verification terminal...",
        );
        await API.post(
          "/api/auth/resend-otp",
          { email },
          { withCredentials: true },
        );
        navigate("/EmailVerification", {
          state: { email: error.response.data.email || email },
        });
        return;
      }

      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail("admin@jinx.com");
    setPassword("@admin123");
    toast.info("Admin credentials loaded!");
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          }
          .custom-input::placeholder {
            color: #6b7280;
          }
          .custom-input:focus {
            outline: none;
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
          }
          .custom-btn:hover:not(:disabled) {
            background-color: #dc2626 !important;
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.6) !important;
          }
          .register-link:hover {
            text-decoration: underline !important;
          }
          .demo-box:hover {
            border-color: #ef4444 !important;
            background-color: #1a1a1d !important;
          }
          .btn-spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: #ffffff;
            border-radius: 50%;
            animation: btn-spin 0.8s linear infinite;
          }
          @keyframes btn-spin {
            to { transform: rotate(360deg); }
          }
          @media (max-width: 768px) {
            .image-section {
              display: none !important;
            }
          }
        `}
      </style>

      <div className="image-section" style={styles.imageSection}>
        <div style={styles.imageOverlay}>
          <h1 style={styles.overlayTitle}>Welcome Back</h1>
          <p style={styles.overlayText}>
            Sign in to access your hand-picked deals and orders.
          </p>
        </div>
      </div>

      <div style={styles.formSection}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Login</h2>
          <p style={styles.subtitle}>
            Please enter your account details to sign in.
          </p>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="custom-input"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="custom-input"
              style={styles.input}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="custom-btn"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? (
              <div style={styles.spinnerWrapper}>
                <div className="btn-spinner"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
          <div 
            className="demo-box" 
            style={styles.demoBox} 
            onClick={fillDemoAdmin}
            title="Click to auto-fill admin credentials"
          >
            <div style={styles.demoHeader}>
              <span style={styles.demoBadge}>DEMO ADMIN</span>
              <span style={styles.demoHint}>(Click to auto-fill)</span>
            </div>
            <div style={styles.demoText}>
              <strong>Email:</strong> admin@jinx.com
            </div>
            <div style={styles.demoText}>
              <strong>Password:</strong> @admin123
            </div>
          </div>
          <p style={styles.footerText}>
            Don't have an account?{" "}
            <Link to="/register" className="register-link" style={styles.link}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    backgroundColor: "#0a0a0a",
  },
  imageSection: {
    flex: 1,
    backgroundImage:
      'url("https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1965&auto=format&fit=crop")',
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
  },
  imageOverlay: {
    background:
      "linear-gradient(to top, rgba(10, 10, 10, 0.95), rgba(10, 10, 10, 0))",
    width: "100%",
    padding: "4rem 3rem",
    color: "#ffffff",
  },
  overlayTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#ffffff",
  },
  overlayText: {
    fontSize: "1.1rem",
    color: "#a1a1aa",
  },
  formSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
    padding: "2rem",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    fontSize: "2rem",
    color: "#ffffff",
    marginBottom: "0.5rem",
    fontWeight: "700",
  },
  subtitle: {
    color: "#9ca3af",
    marginBottom: "2rem",
    fontSize: "0.95rem",
  },
  inputGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#e5e7eb",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    backgroundColor: "#161618",
    border: "1px solid #27272a",
    borderRadius: "6px",
    fontSize: "1rem",
    color: "#ffffff",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  button: {
    width: "100%",
    padding: "0.875rem",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.2s ease",
    marginTop: "0.5rem",
    boxShadow: "0 0 10px rgba(239, 68, 68, 0.3)",
  },
  spinnerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  demoBox: {
    marginTop: "1.5rem",
    padding: "0.875rem 1rem",
    backgroundColor: "#121214",
    border: "1px dashed #3f3f46",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  demoHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  demoBadge: {
    fontSize: "0.7rem",
    fontWeight: "700",
    backgroundColor: "rgba(239, 68, 68, 0.15)",
    color: "#ef4444",
    padding: "2px 6px",
    borderRadius: "4px",
    letterSpacing: "0.5px",
  },
  demoHint: {
    fontSize: "0.75rem",
    color: "#6b7280",
    fontStyle: "italic",
  },
  demoText: {
    fontSize: "0.85rem",
    color: "#d1d5db",
    lineHeight: "1.4",
  },
  footerText: {
    textAlign: "center",
    marginTop: "1.5rem",
    color: "#9ca3af",
    fontSize: "0.9rem",
  },
  link: {
    color: "#ef4444",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Login;