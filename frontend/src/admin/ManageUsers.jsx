import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import API from "../utils/api";

const ManageUsers = () => {
  const { user: currentUser, checkSession } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleUpdating, setRoleUpdating] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const roleOptions = ["user", "admin"];

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await API.get("/api/analytics/users", {
        withCredentials: true,
      });
      setUsers(
        Array.isArray(response.data)
          ? response.data
          : response.data.users || [],
      );
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      setRoleUpdating(userId);
      const response = await API.put(
        `/api/analytics/user/${userId}`,
        { role: newRole },
        { withCredentials: true },
      );

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((u) =>
            u._id === userId ? { ...u, role: newRole } : u,
          ),
        );
        const currentId = currentUser?._id || currentUser?.id;
        if (currentId === userId) {
          await checkSession();
        }
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error(
        error.response?.data?.message || "Failed to update user role",
      );
    } finally {
      setRoleUpdating(null);
    }
  };

  const getRoleBadgeStyle = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return {
          bg: "rgba(168, 85, 247, 0.1)",
          color: "#c084fc",
          border: "#c084fc",
        };
      default:
        return {
          bg: "rgba(59, 130, 246, 0.1)",
          color: "#60a5fa",
          border: "#60a5fa",
        };
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u._id?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Users</h1>
        <p style={styles.subtitle}>
          View registered accounts, manage access levels, and assign platform
          roles.
        </p>
      </div>

      <div style={styles.controlsWrapper}>
        <input
          type="text"
          placeholder="Search by name, email, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="all">All Roles</option>
          <option value="user">Users Only</option>
          <option value="admin">Admins Only</option>
        </select>
      </div>

      {loading ? (
        <div style={styles.loadingText}>Loading users directory...</div>
      ) : filteredUsers.length === 0 ? (
        <div style={styles.emptyCard}>
          {users.length === 0
            ? "No users found in the directory."
            : "No users match your search/filter criteria."}
        </div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>User ID</th>
                <th style={styles.th}>User Details</th>
                <th style={styles.th}>Registered Date</th>
                <th style={styles.th}>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => {
                const roleStyle = getRoleBadgeStyle(u.role);
                const createdDate = u.createdAt
                  ? new Date(u.createdAt).toLocaleDateString()
                  : "N/A";

                return (
                  <tr key={u._id} style={styles.tableRow}>
                    <td
                      style={{
                        ...styles.td,
                        fontFamily: "monospace",
                        color: "#ff4d4d",
                      }}
                    >
                      #{u._id?.slice(-6).toUpperCase()}
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: "600", color: "#fff" }}>
                        {u.name || "Unnamed User"}
                      </div>
                      <div style={{ fontSize: "12px", color: "#a1a1aa" }}>
                        {u.email || "No email provided"}
                      </div>
                    </td>
                    <td style={styles.td}>{createdDate}</td>
                    <td style={styles.td}>
                      <select
                        value={u.role || "user"}
                        disabled={roleUpdating === u._id}
                        onChange={(e) =>
                          handleRoleChange(u._id, e.target.value)
                        }
                        style={{
                          ...styles.roleSelect,
                          backgroundColor: roleStyle.bg,
                          color: roleStyle.color,
                          borderColor: roleStyle.border,
                        }}
                      >
                        {roleOptions.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            style={styles.optionItem}
                          >
                            {opt.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    backgroundColor: "#050507",
    padding: "40px 5%",
    color: "#ffffff",
  },
  header: { marginBottom: "20px" },
  title: { fontSize: "28px", fontWeight: "800", color: "#fff", margin: 0 },
  subtitle: { color: "#a1a1aa", fontSize: "14px", marginTop: "5px" },
  controlsWrapper: {
    display: "flex",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: "1",
    minWidth: "250px",
    padding: "12px 16px",
    backgroundColor: "#101014",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  filterSelect: {
    padding: "12px 16px",
    backgroundColor: "#101014",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
  },
  loadingText: {
    textAlign: "center",
    padding: "50px",
    color: "#a1a1aa",
    fontSize: "18px",
  },
  emptyCard: {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#101014",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.05)",
    color: "#a1a1aa",
  },
  tableWrapper: {
    overflowX: "auto",
    backgroundColor: "#101014",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    minWidth: "600px",
  },
  tableHeaderRow: {
    backgroundColor: "#16161a",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  th: {
    padding: "16px",
    fontSize: "13px",
    fontWeight: "700",
    color: "#a1a1aa",
    textTransform: "uppercase",
  },
  tableRow: {
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    transition: "background 0.2s",
  },
  td: {
    padding: "16px",
    fontSize: "14px",
    color: "#d4d4d8",
    verticalAlign: "middle",
  },
  roleSelect: {
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "700",
    borderWidth: "1px",
    borderStyle: "solid",
    outline: "none",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  optionItem: { backgroundColor: "#101014", color: "#fff" },
};

export default ManageUsers;
