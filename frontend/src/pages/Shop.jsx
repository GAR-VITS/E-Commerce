import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import API from "../utils/api";

function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await API.get("/api/products", {
          withCredentials: true,
        });
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching all products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCats = new Set(
      products.map((p) => p.category || "Uncategorized"),
    );
    return ["ALL", ...Array.from(uniqueCats)];
  }, [products]);
  const categorizedProducts = useMemo(() => {
    return products.reduce((acc, product) => {
      const cat = product.category || "Uncategorized";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(product);
      return acc;
    }, {});
  }, [products]);

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
          .category-pill {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #aaa;
            padding: 10px 22px;
            border-radius: 30px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.2s ease;
            white-space: nowrap;
          }
          .category-pill:hover {
            background: rgba(255, 77, 77, 0.1);
            color: #fff;
            border-color: rgba(255, 77, 77, 0.4);
          }
          .category-pill.active {
            background: linear-gradient(45deg, #ff4d4d, #cc0000);
            color: #fff;
            border-color: transparent;
            box-shadow: 0 5px 15px rgba(255, 77, 77, 0.3);
          }
          .filter-bar {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            padding-bottom: 10px;
            margin-bottom: 40px;
            scrollbar-width: none;
          }
          .filter-bar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div style={styles.pageContainer}>
        <div style={styles.glowOrb} />
        <div style={styles.headerSection}>
          <span style={styles.tagline}>⚡ COMPLETE ARSENAL</span>
          <h1 style={styles.pageTitle}>
            Explore All <span style={styles.gradientText}>Hardware.</span>
          </h1>
          <p style={styles.pageSubtitle}>
            Browse our entire collection of futuristic tech, categorized for
            ultimate precision.
          </p>
          {!loading && categories.length > 1 && (
            <div className="filter-bar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === "ALL" ? "🌐 All Categories" : `🔥 ${cat}`}
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={styles.contentContainer}>
          {loading ? (
            <div style={styles.loadingContainer}>
              <h3 style={{ color: "#fff", fontSize: "20px" }}>
                Loading complete cyber-inventory...
              </h3>
            </div>
          ) : products.length === 0 ? (
            <div style={styles.loadingContainer}>
              <h3 style={{ color: "#888" }}>
                No products found in the database.
              </h3>
            </div>
          ) : (
            Object.keys(categorizedProducts).map((categoryName) => {
              if (
                selectedCategory !== "ALL" &&
                selectedCategory !== categoryName
              ) {
                return null;
              }

              const categoryItems = categorizedProducts[categoryName];

              return (
                <section key={categoryName} style={styles.categorySection}>
                  <div style={styles.categoryHeader}>
                    <div style={styles.indicatorDot} />
                    <h2 style={styles.categoryTitle}>{categoryName}</h2>
                    <span style={styles.countBadge}>
                      {categoryItems.length} Items
                    </span>
                  </div>
                  <div style={styles.divider} />
                  <div className="responsive-product-grid">
                    {categoryItems.map((prod) => (
                      <Link
                        to={`/product/${prod._id}`}
                        key={prod._id}
                        className="product-card-link"
                      >
                        <ProductCard product={prod} />
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })
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
    top: "5%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "600px",
    height: "300px",
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
    margin: "10px 0 15px 0",
  },
  gradientText: {
    background: "linear-gradient(90deg, #ff4d4d, #ff9966)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  pageSubtitle: {
    fontSize: "16px",
    color: "#888",
    maxWidth: "600px",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  contentContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 5%",
    position: "relative",
    zIndex: 1,
  },
  loadingContainer: { textAlign: "center", padding: "100px 0" },
  categorySection: { marginBottom: "60px" },
  categoryHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "15px",
  },
  indicatorDot: {
    width: "8px",
    height: "24px",
    background: "#ff4d4d",
    borderRadius: "4px",
    boxShadow: "0 0 10px #ff4d4d",
  },
  categoryTitle: {
    fontSize: "24px",
    fontWeight: "800",
    margin: 0,
    textTransform: "capitalize",
    color: "#fff",
  },
  countBadge: {
    background: "rgba(255,255,255,0.08)",
    color: "#aaa",
    fontSize: "12px",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.05)",
  },
  divider: {
    width: "100%",
    height: "1px",
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
    marginBottom: "30px",
  },
};

export default Shop;
