import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import API from "../utils/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/api/products/${id}`);
        console.log(res);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      dispatch(
        addToCart({
          productId: product._id,
          name: product.productName,
          price: product.price,
          imageUrl: product.imageUrl,
          qty: Number(qty),
        }),
      );
      toast.success(
        `${qty} x ${product.productName} successfully added to your cart!`,
      );
    }
  };

  const handleQtyChange = (type) => {
    if (type === "inc" && qty < product.stock) {
      setQty((prev) => prev + 1);
    } else if (type === "dec" && qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div style={styles.stateContainer}>
        <div style={styles.spinner}></div>
        <p style={{ color: "#ef4444", marginTop: "1rem", fontWeight: "600" }}>
          Loading Product Details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.stateContainer}>
        <h2 style={{ color: "#ef4444", marginBottom: "1rem" }}>
          Product Not Found
        </h2>
        <p style={{ color: "#a1a1aa", marginBottom: "1.5rem" }}>
          The item you are looking for does not exist or was removed.
        </p>
        <Link to="/" style={styles.backBtn}>
          Return to Store
        </Link>
      </div>
    );
  }

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
          .custom-btn:hover {
            background-color: #dc2626 !important;
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.6) !important;
            transform: translateY(-2px);
          }
          .qty-btn:hover:not(:disabled) {
            background-color: #27272a !important;
            border-color: #ef4444 !important;
          }
          .breadcrumb-link:hover {
            text-decoration: underline !important;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @media (max-width: 900px) {
            .product-grid {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
            .product-title {
              font-size: 2rem !important;
            }
          }
        `}
      </style>
      <nav style={styles.breadcrumb}>
        <Link to="/" className="breadcrumb-link" style={styles.breadcrumbLink}>
          Home
        </Link>
        <span style={styles.separator}>/</span>
        <Link
          to="/shop"
          className="breadcrumb-link"
          style={styles.breadcrumbLink}
        >
          Shop
        </Link>
        <span style={styles.separator}>/</span>
        <span style={{ color: "#a1a1aa" }}>
          {product.category || "Hardware"}
        </span>
        <span style={styles.separator}>/</span>
        <span style={{ color: "#ffffff", fontWeight: "600" }}>
          {product.productName}
        </span>
      </nav>
      <div className="product-grid" style={styles.grid}>
        <div style={styles.imageCard}>
          <div style={styles.imageWrapper}>
            <img
              src={product.imageUrl}
              alt={product.productName}
              style={styles.image}
            />
          </div>
        </div>
        <div style={styles.infoSection}>
          <div style={styles.badgeContainer}>
            <span
              style={
                product.stock > 0 ? styles.inStockBadge : styles.outOfStockBadge
              }
            >
              {product.stock > 0
                ? `● In Stock (${product.stock} available)`
                : "● Temporarily Out of Stock"}
            </span>
            <span style={styles.categoryBadge}>
              {product.category || "Featured Hardware"}
            </span>
          </div>

          <h1 className="product-title" style={styles.title}>
            {product.productName}
          </h1>

          <div style={styles.priceContainer}>
            <span style={styles.price}>
              ₹{Number(product.price || 0).toFixed(2)}
            </span>
            <span style={styles.taxText}>(Inclusive of all taxes)</span>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.descriptionBlock}>
            <h3 style={styles.sectionHeading}>Product Overview</h3>
            <p style={styles.description}>
              {product.description ||
                "No detailed description available for this hardware unit at the moment."}
            </p>
          </div>
          {product.stock > 0 && (
            <div style={styles.actionRow}>
              <div style={styles.qtyContainer}>
                <button
                  type="button"
                  onClick={() => handleQtyChange("dec")}
                  disabled={qty <= 1}
                  className="qty-btn"
                  style={{ ...styles.qtyBtn, opacity: qty <= 1 ? 0.4 : 1 }}
                >
                  −
                </button>
                <span style={styles.qtyDisplay}>{qty}</span>
                <button
                  type="button"
                  onClick={() => handleQtyChange("inc")}
                  disabled={qty >= product.stock}
                  className="qty-btn"
                  style={{
                    ...styles.qtyBtn,
                    opacity: qty >= product.stock ? 0.4 : 1,
                  }}
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="custom-btn"
                style={styles.addToCartBtn}
              >
                Add to Cart — ₹{(product.price * qty).toFixed(2)}
              </button>
            </div>
          )}
          {product.stock <= 0 && (
            <button type="button" disabled style={styles.disabledBtn}>
              Currently Unavailable
            </button>
          )}
          <div style={styles.featuresFooter}>
            <div style={styles.featureItem}>
              <strong style={{ color: "#ffffff" }}>⚡ Fast Dispatch:</strong>{" "}
              Within 24 hours
            </div>
            <div style={styles.featureItem}>
              <strong style={{ color: "#ffffff" }}>🛡️ Warranty:</strong> 1 Year
              Brand Guarantee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    padding: "2rem 5%",
  },
  stateContainer: {
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #161618",
    borderTop: "4px solid #ef4444",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  breadcrumb: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    fontSize: "0.9rem",
    marginBottom: "2rem",
    color: "#6b7280",
  },
  breadcrumbLink: {
    color: "#ef4444",
    textDecoration: "none",
    fontWeight: "500",
  },
  separator: {
    margin: "0 0.75rem",
    color: "#3f3f46",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    gap: "3.5rem",
    maxWidth: "1300px",
    margin: "0 auto",
    alignItems: "start",
  },
  imageCard: {
    backgroundColor: "#161618",
    border: "1px solid #27272a",
    borderRadius: "12px",
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
  },
  imageWrapper: {
    width: "100%",
    maxHeight: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "450px",
    objectFit: "contain",
    borderRadius: "8px",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
  },
  badgeContainer: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  inStockBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    color: "#10b981",
    border: "1px solid rgba(16, 185, 129, 0.2)",
    padding: "0.35rem 0.75rem",
    borderRadius: "50px",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  outOfStockBadge: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    color: "#ef4444",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    padding: "0.35rem 0.75rem",
    borderRadius: "50px",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  categoryBadge: {
    backgroundColor: "#1f1f23",
    color: "#a1a1aa",
    border: "1px solid #27272a",
    padding: "0.35rem 0.75rem",
    borderRadius: "50px",
    fontSize: "0.8rem",
    fontWeight: "500",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: "1.2",
    marginBottom: "1rem",
  },
  priceContainer: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.75rem",
    marginBottom: "1.5rem",
  },
  price: {
    fontSize: "2.25rem",
    fontWeight: "700",
    color: "#ef4444",
  },
  taxText: {
    color: "#6b7280",
    fontSize: "0.85rem",
  },
  divider: {
    height: "1px",
    backgroundColor: "#27272a",
    width: "100%",
    marginBottom: "1.5rem",
  },
  descriptionBlock: {
    marginBottom: "2rem",
  },
  sectionHeading: {
    fontSize: "1.1rem",
    color: "#ffffff",
    marginBottom: "0.75rem",
    fontWeight: "600",
  },
  description: {
    color: "#a1a1aa",
    lineHeight: "1.7",
    fontSize: "1rem",
  },
  actionRow: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "2rem",
  },
  qtyContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#161618",
    border: "1px solid #27272a",
    borderRadius: "8px",
    padding: "0.25rem",
  },
  qtyBtn: {
    width: "40px",
    height: "40px",
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "1px solid transparent",
    borderRadius: "6px",
    fontSize: "1.2rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  },
  qtyDisplay: {
    width: "45px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  addToCartBtn: {
    flex: 1,
    minWidth: "220px",
    padding: "1rem 1.5rem",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.05rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 0 15px rgba(239, 68, 68, 0.3)",
  },
  disabledBtn: {
    width: "100%",
    padding: "1rem 1.5rem",
    backgroundColor: "#1f1f23",
    color: "#6b7280",
    border: "1px solid #27272a",
    borderRadius: "8px",
    fontSize: "1.05rem",
    fontWeight: "600",
    cursor: "not-allowed",
    marginBottom: "2rem",
  },
  backBtn: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "600",
  },
  featuresFooter: {
    display: "flex",
    gap: "2rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #27272a",
    color: "#a1a1aa",
    fontSize: "0.9rem",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
};

export default ProductDetail;
