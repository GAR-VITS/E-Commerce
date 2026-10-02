import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await API.get(
          "/api/orders/myorders",
          {
            withCredentials: true,
          },
        );
        setOrders(response.data.orders);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.status === 404) {
          setOrders([]);
        } else {
          setError("No Orders to fetch start shopping!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusBadge = (status = "Pending") => {
    const s = status.toLowerCase();
    if (s === "delivered")
      return {
        bg: "rgba(34, 197, 94, 0.15)",
        color: "#22c55e",
        label: "Delivered",
      };
    if (s === "shipped")
      return {
        bg: "rgba(59, 130, 246, 0.15)",
        color: "#3b82f6",
        label: "Shipped",
      };
    if (s === "cancelled")
      return {
        bg: "rgba(239, 68, 68, 0.15)",
        color: "#ef4444",
        label: "Cancelled",
      };
    return {
      bg: "rgba(234, 179, 8, 0.15)",
      color: "#eab308",
      label: "Processing",
    };
  };

  if (loading) {
    return (
      <div className="orders-page center-box">
        <div className="spinner"></div>
        <p style={{ marginTop: "16px", color: "#888" }}>
          Loading your orders...
        </p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <style>{`
        .orders-page {
          min-height: 85vh;
          background: #0b0b0e;
          color: #ffffff;
          padding: 40px 20px;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .orders-container {
          max-width: 850px;
          margin: 0 auto;
        }

        .center-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 60vh;
        }

        .page-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .page-title span {
          color: #ff4d4d;
        }

        /* Empty State Styling */
        .empty-card {
          background: #121215;
          border: 1px solid #222226;
          border-radius: 16px;
          padding: 48px 24px;
          max-width: 450px;
          width: 100%;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 16px;
          display: block;
        }

        /* Order Card Styling */
        .order-card {
          background: #121215;
          border: 1px solid #222226;
          border-radius: 16px;
          margin-bottom: 24px;
          overflow: hidden;
          transition: border-color 0.2s ease;
        }

        .order-card:hover {
          border-color: #33333b;
        }

        /* Card Header */
        .card-header {
          background: #16161b;
          padding: 16px 24px;
          border-bottom: 1px solid #222226;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .meta-group {
          display: flex;
          gap: 24px;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
        }

        .meta-label {
          font-size: 0.75rem;
          color: #777780;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .meta-value {
          font-size: 0.9rem;
          font-weight: 600;
          color: #dddddd;
          margin-top: 2px;
        }

        .status-badge {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* Products List */
        .products-list {
          padding: 20px 24px;
        }

        .product-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #1a1a20;
        }

        .product-item:last-child {
          border-bottom: none;
        }

        .product-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .product-img {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          object-fit: cover;
          background: #1a1a20;
          border: 1px solid #2a2a32;
        }

        .product-details {
          display: flex;
          flex-direction: column;
        }

        .product-name {
          font-weight: 600;
          font-size: 0.95rem;
          color: #ffffff;
        }

        .product-qty {
          font-size: 0.85rem;
          color: #888888;
          margin-top: 4px;
        }

        .product-price {
          font-weight: 600;
          font-size: 0.95rem;
          color: #ffffff;
        }

        /* Card Footer */
        .card-footer {
          background: #121215;
          padding: 16px 24px;
          border-top: 1px solid #1a1a20;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .total-label {
          font-size: 0.9rem;
          color: #888888;
        }

        .total-amount {
          font-size: 1.2rem;
          font-weight: 700;
          color: #ff4d4d;
        }

        /* Buttons */
        .btn-shop {
          background: #ff4d4d;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          display: inline-block;
          margin-top: 20px;
          transition: background 0.2s ease;
        }

        .btn-shop:hover {
          background: #e63939;
        }

        /* Loading Spinner */
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
          .card-header { flex-direction: column; align-items: flex-start; }
          .meta-group { flex-wrap: wrap; gap: 16px; }
          .product-item { flex-direction: column; align-items: flex-start; gap: 12px; }
          .product-price { align-self: flex-end; }
        }
      `}</style>

      <div className="orders-container">
        <h1 className="page-title">
          My <span>Orders</span>
        </h1>

        {/* Error State */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid #ef4444",
              padding: "16px",
              borderRadius: "10px",
              color: "#ef4444",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="center-box">
            <div className="empty-card">
              <span className="empty-icon">📦</span>
              <h2 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>
                No Orders Yet
              </h2>
              <p
                style={{
                  color: "#888888",
                  fontSize: "0.9rem",
                  lineHeight: "1.5",
                }}
              >
                Looks like you haven't placed any orders with us yet. Start
                exploring our store to find something you love!
              </p>
              <Link to="/" className="btn-shop">
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* Orders List */
          orders.map((order) => {
            const badge = getStatusBadge(order.status);
            const formattedDate = order.createdAt
              ? new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recent Order";

            return (
              <div key={order._id} className="order-card">
                {/* Header Info */}
                <div className="card-header">
                  <div className="meta-group">
                    <div className="meta-item">
                      <span className="meta-label">Order Placed</span>
                      <span className="meta-value">{formattedDate}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Order ID</span>
                      <span
                        className="meta-value"
                        style={{ fontFamily: "monospace" }}
                      >
                        #{order._id.slice(-8).toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div
                    className="status-badge"
                    style={{ backgroundColor: badge.bg, color: badge.color }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: badge.color,
                      }}
                    ></span>
                    {badge.label}
                  </div>
                </div>

                {/* Populated Products with Snapshot Protection */}
                <div className="products-list">
                  {order.products.map((item, index) => {
                    const product = item.product || {};

                    // 1. Prioritize snapshotted name/image, fallback to live populated product
                    const name =
                      item.name ||
                      product.productName ||
                      product.name ||
                      "Product Item";
                    const image =
                      item.image ||
                      product.imageUrl ||
                      product.image ||
                      "https://via.placeholder.com/60?text=Item";

                    // 2. THE CRITICAL FIX: Read item.price first!
                    const price =
                      item.price !== undefined
                        ? item.price
                        : product.price || 0;
                    const qty = item.quantity || item.qty || 1;

                    return (
                      <div key={item._id || index} className="product-item">
                        <div className="product-info">
                          <img src={image} alt={name} className="product-img" />
                          <div className="product-details">
                            <span className="product-name">{name}</span>
                            <span className="product-qty">
                              Qty: {qty} × ₹{Number(price).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="product-price">
                          ₹{(price * qty).toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Total */}
                <div className="card-footer">
                  <span className="total-label">Total Amount</span>
                  <span className="total-amount">
                    ₹{(order.totalAmount || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyOrders;
