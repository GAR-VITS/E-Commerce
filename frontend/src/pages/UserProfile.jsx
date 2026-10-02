import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import API from "../utils/api";

const UserProfile = () => {
  const { user: authUser, setUser } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const [profile, setProfile] = useState(authUser || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/auth/me", {
          withCredentials: true,
        });

        const userData = response.data.user || response.data;
        setProfile(userData);
        if (setUser) setUser(userData);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load profile details. Please log in again.");
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, setUser]);

  const getRoleBadgeStyle = (role) => {
    if (role === "admin") {
      return {
        backgroundColor: "rgba(255, 77, 77, 0.15)",
        color: "#ff4d4d",
        border: "1px solid rgba(255, 77, 77, 0.3)",
      };
    }
    return {
      backgroundColor: "rgba(59, 130, 246, 0.15)",
      color: "#60a5fa",
      border: "1px solid rgba(59, 130, 246, 0.3)",
    };
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.spinner}></div>
        <p style={{ marginTop: "16px", color: "#a1a1aa" }}>
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={styles.card}>
        <div style={styles.profileHeader}>
          <div style={styles.avatar}>{getInitials(profile?.name)}</div>
          <div style={styles.headerInfo}>
            <h1 style={styles.userName}>{profile?.name || "User Name"}</h1>
            <p style={styles.userEmail}>
              {profile?.email || "No email provided"}
            </p>
            <div
              style={{
                ...styles.roleBadge,
                ...getRoleBadgeStyle(profile?.role),
              }}
            >
              ⚡ {profile?.role ? profile.role.toUpperCase() : "USER"}
            </div>
          </div>
        </div>

        <div style={styles.divider}></div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Account Details</h3>
          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.label}>Full Name</span>
              <span style={styles.value}>{profile?.name || "N/A"}</span>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.label}>Email Address</span>
              <span style={styles.value}>{profile?.email || "N/A"}</span>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.label}>Account Role</span>
              <span style={styles.value}>{profile?.role || "user"}</span>
            </div>

            <div style={styles.infoItem}>
              <span style={styles.label}>User ID</span>
              <span
                style={{
                  ...styles.value,
                  fontFamily: "monospace",
                  fontSize: "13px",
                }}
              >
                {profile?._id || profile?.id || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div style={styles.divider}></div>

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          <div style={styles.actionGrid}>
            <Link to="/myorders" style={styles.actionBtn}>
              📦 My Orders
            </Link>

            {profile?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                style={{ ...styles.actionBtn, ...styles.adminActionBtn }}
              >
                ⚡ Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    backgroundColor: "#050507",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    color: "#ffffff",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  centerContainer: {
    minHeight: "80vh",
    backgroundColor: "#050507",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid rgba(255, 77, 77, 0.2)",
    borderTopColor: "#ff4d4d",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  card: {
    backgroundColor: "#101014",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "16px",
    padding: "35px",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  avatar: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    backgroundColor: "#ff4d4d",
    color: "#ffffff",
    fontSize: "26px",
    fontWeight: "800",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 15px rgba(255, 77, 77, 0.3)",
  },
  headerInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  userName: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
  },
  userEmail: {
    fontSize: "14px",
    color: "#a1a1aa",
    margin: 0,
  },
  roleBadge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    marginTop: "4px",
    alignSelf: "flex-start",
  },
  divider: {
    height: "1px",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    margin: "25px 0",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#ff4d4d",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    margin: 0,
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },
  infoItem: {
    backgroundColor: "#16161a",
    padding: "14px 16px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    color: "#a1a1aa",
    fontWeight: "600",
  },
  value: {
    fontSize: "14px",
    color: "#ffffff",
    fontWeight: "600",
  },
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },
  actionBtn: {
    backgroundColor: "#16161a",
    border: "1px solid #27272a",
    color: "#ffffff",
    padding: "12px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center",
    transition: "all 0.2s ease",
  },
  adminActionBtn: {
    backgroundColor: "rgba(255, 77, 77, 0.1)",
    borderColor: "rgba(255, 77, 77, 0.3)",
    color: "#ff4d4d",
  },
};

export default UserProfile;
