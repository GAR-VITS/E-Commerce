import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import API from "../utils/api";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    orderCount: 0,
    productCount: 0,
    userCount: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
      return;
    }

    if (!user) return;

    const fetchDashboardStats = async () => {
      try {
        const response = await API.get("/api/analytics", {
          withCredentials: true
        });
        
        setStats(response.data);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        if (err.response?.status === 401) {
          toast.error("Your session has expired. Redirecting to login...");
          setTimeout(() => navigate('/login'), 2000);
        } else if (err.response?.status === 403) {
          toast.error("Forbidden Access: Admin privileges required.");
          setTimeout(() => navigate('/'), 2000);
        } else {
          toast.error(err.response?.data?.message || "Failed to load dashboard metrics.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="admin-page center-box">
        <div className="spinner"></div>
        <p style={{ marginTop: '16px', color: '#888' }}>Loading admin metrics...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <style>{`
        .admin-page {
          min-height: 85vh;
          background: #0b0b0e;
          color: #ffffff;
          padding: 40px 20px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .admin-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .center-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
        }

        .admin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 15px;
          border-bottom: 1px solid #222226;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }

        .page-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
        }

        .page-title span {
          color: #ff4d4d;
        }

        .welcome-text {
          color: #a1a1aa;
          font-size: 0.95rem;
          margin: 4px 0 0 0;
        }

        .admin-badge {
          background: rgba(255, 77, 77, 0.15);
          color: #ff4d4d;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid rgba(255, 77, 77, 0.3);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: #121215;
          border: 1px solid #222226;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .stat-card:hover {
          border-color: #33333b;
          transform: translateY(-2px);
        }

        .stat-label {
          color: #888888;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 2.2rem;
          font-weight: 700;
          color: #ffffff;
        }

        .stat-value.revenue {
          color: #22c55e;
        }

        .controls-card {
          background: #121215;
          border: 1px solid #222226;
          border-radius: 16px;
          padding: 30px;
        }

        .controls-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #ffffff;
          margin: 0 0 20px 0;
        }

        .button-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .btn-control {
          background: #1a1a20;
          border: 1px solid #2a2a32;
          color: #dddddd;
          padding: 14px 20px;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.2s ease;
        }

        .btn-control:hover {
          background: #22222a;
          border-color: #444450;
          color: #ffffff;
        }

        .btn-control.primary {
          background: #ff4d4d;
          border-color: #ff4d4d;
          color: #ffffff;
        }

        .btn-control.primary:hover {
          background: #e63939;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 77, 77, 0.2);
          border-top-color: #ff4d4d;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 600px) {
          .admin-header { flex-direction: column; align-items: flex-start; }
          .stat-value { font-size: 1.8rem; }
        }
      `}</style>

      <div className="admin-container">
        
        <div className="admin-header">
          <div>
            <h1 className="page-title">
              Admin <span>Dashboard</span>
            </h1>
            <p className="welcome-text">
              Welcome back, <strong style={{ color: '#fff' }}>{user?.name || 'Admin'}</strong>. Here is your store's performance.
            </p>
          </div>
          <div className="admin-badge">⚡ System Admin</div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">{stats.orderCount}</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value revenue">
              ₹{(stats.totalRevenue || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Total Products</span>
            <span className="stat-value">{stats.productCount}</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Registered Users</span>
            <span className="stat-value">{stats.userCount}</span>
          </div>
        </div>

        <div className="controls-card">
          <h3 className="controls-title">Administrative Controls</h3>
          <div className="button-grid">
            <Link to="/admin/add-product" className="btn-control primary">
              <span>+</span> Add New Product
            </Link>
            <Link to="/admin/orders" className="btn-control">
              📦 Manage Orders
            </Link>
            <Link to="/admin/products" className="btn-control">
              🛍️ Manage Products
            </Link>
            <Link to="/admin/users" className="btn-control">
              👥 Users Directory
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;