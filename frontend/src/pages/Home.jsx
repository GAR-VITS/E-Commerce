import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import API from "../utils/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/api/products", {
          withCredentials: true,
        });
        setProducts(response.data.products.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes pulseGlow {
            0% { opacity: 0.4; filter: blur(40px); }
            50% { opacity: 0.8; filter: blur(60px); }
            100% { opacity: 0.4; filter: blur(40px); }
          }
          .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
          @media (max-width: 900px) {
            .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
            .hero-stats { justify-content: center !important; }
          }
          .responsive-product-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
            width: 100%;
          }
          /* ✨ NEW: Card Hover Animation Effect ✨ */
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
        `}
      </style>

      <div style={styles.pageContainer}>
        <section style={styles.heroSection}>
          <div style={styles.glowOrb1} />
          <div style={styles.glowOrb2} />

          <div style={styles.heroContent} className="hero-grid">
            <div>
              <span style={styles.tagline}>🚀 THE FUTURE OF TECH RETAIL</span>
              <h1 style={styles.heroTitle}>
                Next-Gen Gear For{" "}
                <span style={styles.gradientText}>Modern Creators.</span>
              </h1>
              <p style={styles.heroSubtitle}>
                Experience unmatched precision, futuristic design, and
                lightning-fast delivery on all top-tier setups.
              </p>
              <div style={styles.actionRow}>
                <Link to="/shop" style={styles.primaryBtn}>
                  Explore Collection
                </Link>
                <Link to="/deals" style={styles.secondaryBtn}>
                  View Deals
                </Link>
              </div>

              <div style={styles.statsRow} className="hero-stats">
                <div>
                  <h3 style={styles.statNum}>50k+</h3>
                  <p style={styles.statLabel}>Orders Shipped</p>
                </div>
                <div style={styles.statDivider} />
                <div>
                  <h3 style={styles.statNum}>99.8%</h3>
                  <p style={styles.statLabel}>Positive Reviews</p>
                </div>
                <div style={styles.statDivider} />
                <div>
                  <h3 style={styles.statNum}>24/7</h3>
                  <p style={styles.statLabel}>Live Support</p>
                </div>
              </div>
            </div>

            {/* Visual Decorative Hero Card */}
            <div style={styles.visualCardContainer}>
              <div style={styles.glassCard}>
                <img
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80"
                  alt="Tech Visual"
                  style={styles.heroImg}
                />
                <div style={styles.cardOverlay}>
                  <span>🔥 Trending Now: Retro-Futurism Setup</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section style={styles.productsSection}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Featured Arrivals</h2>
              <p style={styles.sectionSub}>
                Hand-picked hardware designed for maximum performance.
              </p>
            </div>
            <Link to="/shop" style={styles.viewAllLink}>
              View All Products →
            </Link>
          </div>

          {loading ? (
            <h3
              style={{ color: "#fff", textAlign: "center", padding: "50px 0" }}
            >
              Loading futuristic gear...
            </h3>
          ) : (
            <div className="responsive-product-grid">
              {products.map((prod) => (
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
        </section>
      </div>
    </>
  );
}

const styles = {
  pageContainer: {
    background: "#0a0a0c",
    minHeight: "100vh",
    color: "#fff",
    overflowX: "hidden",
  },
  heroSection: {
    position: "relative",
    padding: "80px 5%",
    minHeight: "600px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  glowOrb1: {
    position: "absolute",
    top: "-10%",
    left: "10%",
    width: "400px",
    height: "400px",
    background:
      "radial-gradient(circle, rgba(255,77,77,0.25) 0%, rgba(0,0,0,0) 70%)",
    borderRadius: "50%",
    animation: "pulseGlow 6s infinite",
  },
  glowOrb2: {
    position: "absolute",
    bottom: "10%",
    right: "10%",
    width: "500px",
    height: "500px",
    background:
      "radial-gradient(circle, rgba(77,121,255,0.2) 0%, rgba(0,0,0,0) 70%)",
    borderRadius: "50%",
    animation: "pulseGlow 8s infinite",
  },
  heroContent: { maxWidth: "1400px", width: "100%", zIndex: 1 },
  tagline: {
    color: "#ff4d4d",
    fontSize: "14px",
    fontWeight: "bold",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  heroTitle: {
    fontSize: "clamp(36px, 5vw, 64px)",
    fontWeight: "900",
    lineHeight: "1.1",
    margin: "15px 0 20px 0",
  },
  gradientText: {
    background: "linear-gradient(90deg, #ff4d4d, #ff9966)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    fontSize: "18px",
    color: "#aaa",
    lineHeight: "1.6",
    marginBottom: "35px",
    maxWidth: "550px",
  },
  actionRow: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "50px",
  },
  primaryBtn: {
    background: "linear-gradient(45deg, #ff4d4d, #cc0000)",
    color: "#fff",
    textDecoration: "none",
    padding: "15px 32px",
    borderRadius: "8px",
    fontWeight: "bold",
    boxShadow: "0 10px 25px rgba(255,77,77,0.3)",
    transition: "transform 0.2s",
  },
  secondaryBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "#fff",
    textDecoration: "none",
    padding: "15px 32px",
    borderRadius: "8px",
    fontWeight: "bold",
  },
  statsRow: { display: "flex", alignItems: "center", gap: "30px" },
  statNum: { fontSize: "28px", fontWeight: "800", margin: 0, color: "#fff" },
  statLabel: { fontSize: "13px", color: "#888", margin: 0 },
  statDivider: {
    width: "1px",
    height: "40px",
    background: "rgba(255,255,255,0.1)",
  },
  visualCardContainer: { display: "flex", justifyContent: "center" },
  glassCard: {
    position: "relative",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    background: "rgba(255,255,255,0.02)",
  },
  heroImg: {
    width: "100%",
    maxWidth: "550px",
    height: "auto",
    display: "block",
    transform: "scale(1.02)",
  },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "20px",
    background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
    fontWeight: "600",
    fontSize: "14px",
  },
  productsSection: { maxWidth: "1400px", margin: "0 auto", padding: "80px 5%" },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "20px",
  },
  sectionTitle: { fontSize: "32px", fontWeight: "800", margin: "0 0 10px 0" },
  sectionSub: { color: "#888", fontSize: "16px", margin: 0 },
  viewAllLink: {
    color: "#ff4d4d",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
  },
};

export default Home;
