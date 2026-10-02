import React from "react";

function ProductCard({ product }) {
  const { productName, description, price, category, stock, imageUrl } =
    product;

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <span style={styles.categoryBadge}>{category}</span>
        {stock === 0 && <span style={styles.outOfStockBadge}>Sold Out</span>}
        <img
          src={imageUrl}
          alt={productName}
          style={{ ...styles.image, opacity: stock === 0 ? 0.3 : 1 }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
      </div>

      <div style={styles.content}>
        <h3 style={styles.title} title={productName}>
          {productName}
        </h3>
        <p style={styles.description}>
          {description?.length > 50
            ? `${description.substring(0, 50)}...`
            : description || "High performance gear for pros."}
        </p>

        <div style={styles.footerRow}>
          <span style={styles.price}>
            {price.toString().startsWith("$") ? price : `₹${price}`}
          </span>

          {/* Updated to a stylish 'View Details' action button */}
          <button
            style={{
              ...styles.viewBtn,
              background:
                stock === 0
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(255, 77, 77, 0.15)",
              color: stock === 0 ? "#666" : "#ff4d4d",
              border:
                stock === 0
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "1px solid rgba(255, 77, 77, 0.4)",
            }}
          >
            {stock === 0 ? "Sold Out" : "View Details →"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#141418",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    height: "100%",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "220px",
    background: "#0e0e11",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s",
  },
  categoryBadge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "rgba(0,0,0,0.7)",
    color: "#fff",
    fontSize: "11px",
    padding: "4px 10px",
    borderRadius: "20px",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  outOfStockBadge: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#ff4d4d",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "14px",
    zIndex: 2,
  },
  content: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fff",
    margin: "0 0 8px 0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  description: {
    fontSize: "13px",
    color: "#888",
    lineHeight: "1.5",
    margin: "0 0 20px 0",
    height: "38px",
    overflow: "hidden",
  },
  footerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "15px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  price: { fontSize: "22px", fontWeight: "800", color: "#ef4444" },
  viewBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
};

export default ProductCard;
