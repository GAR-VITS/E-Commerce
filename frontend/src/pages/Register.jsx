import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../utils/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post(
        "/api/auth/signup",
        { name, email, password },
        { withCredentials: true },
      );

      toast.success(
        "Registration Successful! Please check your email for the Welcome OTP.",
      );
      navigate("/EmailVerification", { state: { email } });
    } catch (error) {
      console.log("Registration error: ", error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
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
          <h1 style={styles.overlayTitle}>Join E-Shop</h1>
          <p style={styles.overlayText}>
            Create an account to unlock exclusive deals and fast checkout.
          </p>
        </div>
      </div>

      <div style={styles.formSection}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>
            Please fill in your details to get started.
          </p>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="custom-input"
              style={styles.input}
            />
          </div>

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
                <span>Creating Account...</span>
              </div>
            ) : (
              "Register"
            )}
          </button>

          <p style={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" className="register-link" style={styles.link}>
              Login
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
      'url("https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=1925&auto=format&fit=crop")',
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
    marginBottom: "1.25rem",
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
    marginTop: "0.75rem",
    boxShadow: "0 0 10px rgba(239, 68, 68, 0.3)",
  },
  spinnerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
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

export default Register;
