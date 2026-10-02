import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeFromCart } from "../redux/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id, itemName) => {
    dispatch(removeFromCart(id));
    toast.info(`${itemName || "Item"} removed from cart`);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const estimatedShipping = totalPrice > 0 ? (totalPrice > 4999 ? 0 : 250) : 0;
  const finalTotal = totalPrice + estimatedShipping;

  return (
    <>
      <style>
        {`
          @keyframes pulseGlow {
            0% { opacity: 0.25; filter: blur(40px); }
            50% { opacity: 0.5; filter: blur(60px); }
            100% { opacity: 0.25; filter: blur(40px); }
          }
          .cart-grid {
            display: grid;
            grid-template-columns: 1fr 380px;
            gap: 40px;
            align-items: start;
          }
          @media (max-width: 950px) {
            .cart-grid { grid-template-columns: 1fr !important; }
          }
          .cart-item-card {
            background: #141418;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 20px;
            transition: transform 0.2s, border-color 0.2s;
          }
          .cart-item-card:hover {
            border-color: rgba(255, 77, 77, 0.3);
            transform: translateX(4px);
          }
          @media (max-width: 600px) {
            .cart-item-card { flex-direction: column; align-items: flex-start; }
            .item-actions { width: 100%; justify-content: space-between !important; margin-top: 15px; }
          }
          .remove-btn {
            background: transparent;
            border: none;
            color: #666;
            cursor: pointer;
            font-size: 14px;
            text-decoration: underline;
            transition: color 0.2s;
          }
          .remove-btn:hover { color: #ff4d4d; }
          .stock-info-text {
            font-size: 11px;
            color: #888;
            margin-top: 4px;
            display: block;
          }
        `}
      </style>

      <div style={styles.pageContainer}>
        <div style={styles.glowOrb} />

        <div style={styles.contentWrapper}>
          {/* Header Section */}
          <div style={styles.header}>
            <span style={styles.tagline}>🛒 COMMAND CENTER</span>
            <h1 style={styles.pageTitle}>
              Your Shopping <span style={styles.gradientText}>Cart.</span>
            </h1>
          </div>

          {/* Empty Cart Cyber-State */}
          {cartItems.length === 0 ? (
            <div style={styles.emptyContainer}>
              <div style={styles.emptyCard}>
                <span
                  style={{
                    fontSize: "48px",
                    display: "block",
                    marginBottom: "15px",
                  }}
                >
                  🖥️
                </span>
                <h2
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "0 0 10px 0",
                  }}
                >
                  No Hardware Detected
                </h2>
                <p
                  style={{
                    color: "#888",
                    margin: "0 0 25px 0",
                    lineHeight: "1.5",
                  }}
                >
                  Your shopping cart is currently empty. Initialize your setup
                  by browsing our latest cyber-inventory.
                </p>
                <Link to="/shop" style={styles.primaryBtn}>
                  Explore All Gear →
                </Link>
              </div>
            </div>
          ) : (
            /* Active Cart Layout */
            <div className="cart-grid">
              {/* Left Column: Cart Items List */}
              <div className="cart-items">
                {cartItems.map((item) => {
                  const itemId = item.productId || item._id;
                  const itemName =
                    item.name || item.productName || "Unnamed Hardware";
                  const availableStock = item.stock ?? item.countInStock;

                  return (
                    <div key={itemId} className="cart-item-card">
                      {/* Product Image & Title linked to product page */}
                      <div style={styles.itemInfo}>
                        <Link to={`/product/${itemId}`}>
                          <img
                            src={item.imageUrl}
                            alt={itemName}
                            style={styles.itemImage}
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/150?text=No+Image";
                            }}
                          />
                        </Link>
                        <div>
                          <Link
                            to={`/product/${itemId}`}
                            style={styles.itemTitleLink}
                          >
                            <h4 style={styles.itemTitle}>{itemName}</h4>
                          </Link>
                          <span style={styles.itemPrice}>
                            ₹{item.price?.toLocaleString()}
                          </span>
                          {availableStock !== undefined && (
                            <span className="stock-info-text">
                              In Stock: {availableStock}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Read-Only Quantity Badge & Remove Action */}
                      <div style={styles.itemActions} className="item-actions">
                        <div style={styles.qtyBadge}>
                          <span
                            style={{
                              color: "#888",
                              fontWeight: "normal",
                              marginRight: "6px",
                            }}
                          >
                            Qty:
                          </span>
                          <span>{item.qty}</span>
                        </div>

                        <button
                          onClick={() => handleRemove(itemId, itemName)}
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Order Summary Card */}
              <div style={styles.summaryCard}>
                <h3 style={styles.summaryTitle}>Order Summary</h3>
                <div style={styles.divider} />

                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>
                    Subtotal ({cartItems.length} items)
                  </span>
                  <span style={styles.summaryValue}>
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>

                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Estimated Shipping</span>
                  <span style={styles.summaryValue}>
                    {estimatedShipping === 0 ? (
                      <span style={{ color: "#4caf50", fontWeight: "bold" }}>
                        FREE
                      </span>
                    ) : (
                      `₹${estimatedShipping}`
                    )}
                  </span>
                </div>

                <div style={styles.divider} />

                <div style={{ ...styles.summaryRow, marginBottom: "25px" }}>
                  <span style={styles.totalLabel}>Total Amount</span>
                  <span style={styles.totalValue}>
                    ₹{finalTotal.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  style={styles.checkoutBtn}
                >
                  Proceed to Checkout 🔒
                </button>

                <p style={styles.secureText}>
                  🛡️ 256-Bit SSL Encrypted Cyber-Checkout
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const styles = {
  pageContainer: {
    background: "#0a0a0c",
    minHeight: "100vh",
    color: "#fff",
    position: "relative",
    overflowX: "hidden",
    paddingBottom: "80px",
  },
  glowOrb: {
    position: "absolute",
    top: "10%",
    right: "10%",
    width: "450px",
    height: "450px",
    background:
      "radial-gradient(circle, rgba(255,77,77,0.15) 0%, rgba(0,0,0,0) 70%)",
    borderRadius: "50%",
    animation: "pulseGlow 6s infinite",
    pointerEvents: "none",
  },
  contentWrapper: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "60px 5%",
    position: "relative",
    zIndex: 1,
  },
  header: { marginBottom: "40px" },
  tagline: {
    color: "#ff4d4d",
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  pageTitle: {
    fontSize: "clamp(32px, 4vw, 48px)",
    fontWeight: "900",
    margin: "10px 0 0 0",
  },
  gradientText: {
    background: "linear-gradient(90deg, #ff4d4d, #ff9966)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  /* Empty State Styles */
  emptyContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px 0",
  },
  emptyCard: {
    background: "#141418",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "50px 40px",
    borderRadius: "20px",
    textAlign: "center",
    maxWidth: "480px",
    width: "100%",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
  },
  primaryBtn: {
    background: "linear-gradient(45deg, #ff4d4d, #cc0000)",
    color: "#fff",
    textDecoration: "none",
    padding: "14px 32px",
    borderRadius: "8px",
    fontWeight: "bold",
    display: "inline-block",
    boxShadow: "0 10px 25px rgba(255,77,77,0.3)",
    transition: "transform 0.2s",
  },

  /* Item Styles */
  itemInfo: { display: "flex", alignItems: "center", gap: "20px" },
  itemImage: {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "10px",
    background: "#0e0e11",
    border: "1px solid rgba(255,255,255,0.05)",
  },
  itemTitleLink: { textDecoration: "none", color: "inherit" },
  itemTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 6px 0",
    color: "#fff",
    transition: "color 0.2s",
  },
  itemPrice: { fontSize: "16px", fontWeight: "800", color: "#ff4d4d" },
  itemActions: { display: "flex", alignItems: "center", gap: "25px" },
  qtyBadge: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.04)",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.08)",
    fontSize: "15px",
    fontWeight: "bold",
  },

  /* Summary Card Styles */
  summaryCard: {
    background: "#141418",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "30px",
    position: "sticky",
    top: "100px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
  },
  summaryTitle: { fontSize: "20px", fontWeight: "800", margin: "0 0 20px 0" },
  divider: {
    width: "100%",
    height: "1px",
    background: "rgba(255,255,255,0.08)",
    margin: "20px 0",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  summaryLabel: { color: "#888", fontSize: "14px" },
  summaryValue: { fontWeight: "600", fontSize: "15px", color: "#fff" },
  totalLabel: { fontSize: "18px", fontWeight: "bold", color: "#fff" },
  totalValue: { fontSize: "24px", fontWeight: "900", color: "#ff4d4d" },
  checkoutBtn: {
    width: "100%",
    background: "linear-gradient(45deg, #ff4d4d, #cc0000)",
    border: "none",
    color: "#fff",
    padding: "16px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(255,77,77,0.3)",
    transition: "transform 0.2s, boxShadow 0.2s",
  },
  secureText: {
    textAlign: "center",
    color: "#666",
    fontSize: "12px",
    marginTop: "15px",
    marginBottom: 0,
  },
};

export default Cart;
