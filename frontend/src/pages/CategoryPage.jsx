import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import API from "../utils/api";

function CategoryPage() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await API.get("/api/products", {
          withCredentials: true,
        });
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);
  const categoryProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.category &&
        p.category.toLowerCase() === decodeURIComponent(category).toLowerCase(),
    );
  }, [products, category]);

  return (
    <>
      <style>
        {`
          @keyframes pulseGlow {
            0% { opacity: 0.3; filter: blur(40px); }
            50% { opacity: 0.6; filter: blur(60px); }
            100% { opacity: 0.3; filter: blur(40px); }
          }
          .responsive-product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
            width: 100%;
          }
          .product-card-link {
            text-decoration: none;
            color: inherit;
            display: block;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 12px;
          }
          .product-card-link:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 30px rgba(255, 77, 77, 0.2);
          }
          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #aaa;
            text-decoration: none;
            font-size: 14px;
            font-weight: 600;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            transition: all 0.2s ease;
            margin-bottom: 25px;
          }
          .back-link:hover {
            color: #fff;
            background: rgba(255, 77, 77, 0.15);
            border-color: rgba(255, 77, 77, 0.4);
          }
        `}
      </style>

      <div style={styles.pageContainer}>
        <div style={styles.glowOrb} />

        {/* Page Header */}
        <div style={styles.headerSection}>
          <Link to="/shop" className="back-link">
            ← Back to All Categories
          </Link>

          <div style={styles.titleRow}>
            <div>
              <span style={styles.tagline}>🎯 CATEGORY SHOWROOM</span>
              <h1 style={styles.pageTitle}>
                {decodeURIComponent(category)}{" "}
                <span style={styles.gradientText}>Gear.</span>
              </h1>
            </div>
            {!loading && (
              <span style={styles.countBadge}>
                {categoryProducts.length}{" "}
                {categoryProducts.length === 1 ? "Product" : "Products"}{" "}
                Available
              </span>
            )}
          </div>
          <div style={styles.divider} />
        </div>

        {/* Content Section */}
        <div style={styles.contentContainer}>
          {loading ? (
            <div style={styles.stateContainer}>
              <h3 style={{ color: "#fff", fontSize: "20px" }}>
                Scanning cyber-inventory for {category}...
              </h3>
            </div>
          ) : categoryProducts.length === 0 ? (
            <div style={styles.stateContainer}>
              <div style={styles.emptyCard}>
                <h2 style={{ color: "#fff", marginBottom: "10px" }}>
                  No gear found in "{decodeURIComponent(category)}"
                </h2>
                <p style={{ color: "#888", marginBottom: "25px" }}>
                  We might be out of stock or restocking this specific hardware
                  category soon.
                </p>
                <Link to="/shop" style={styles.primaryBtn}>
                  Browse All Hardware
                </Link>
              </div>
            </div>
          ) : (
            <div className="responsive-product-grid">
              {categoryProducts.map((prod) => (
                <Link
                  to={`/product/${prod._id}`}
                  key={prod._id}
                  className="product-card-link"
                >
                  <ProductCard product={prod} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

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
    left: "30%",
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(circle, rgba(255,77,77,0.15) 0%, rgba(0,0,0,0) 70%)",
    borderRadius: "50%",
    animation: "pulseGlow 6s infinite",
    pointerEvents: "none",
  },
  headerSection: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "60px 5% 20px 5%",
    position: "relative",
    zIndex: 1,
  },
  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexWrap: "wrap",
    gap: "20px",
    marginBottom: "20px",
  },
  tagline: {
    color: "#ff4d4d",
    fontSize: "13px",
    fontWeight: "bold",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  pageTitle: {
    fontSize: "clamp(32px, 4vw, 54px)",
    fontWeight: "900",
    margin: "10px 0 0 0",
    textTransform: "capitalize",
  },
  gradientText: {
    background: "linear-gradient(90deg, #ff4d4d, #ff9966)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  countBadge: {
    background: "rgba(255, 77, 77, 0.1)",
    color: "#ff4d4d",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid rgba(255, 77, 77, 0.3)",
  },
  divider: {
    width: "100%",
    height: "1px",
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)",
    marginBottom: "40px",
  },
  contentContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 5%",
    position: "relative",
    zIndex: 1,
  },
  stateContainer: {
    textAlign: "center",
    padding: "80px 0",
    display: "flex",
    justifyContent: "center",
  },
  emptyCard: {
    background: "#141418",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "50px 30px",
    borderRadius: "16px",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
  },
  primaryBtn: {
    background: "linear-gradient(45deg, #ff4d4d, #cc0000)",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 28px",
    borderRadius: "8px",
    fontWeight: "bold",
    display: "inline-block",
    boxShadow: "0 10px 25px rgba(255,77,77,0.3)",
  },
};

export default CategoryPage;
