import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../utils/api";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get("/api/products");
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.products || [];
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await API.delete(`/api/products/${id}`, {
        withCredentials: true,
      });
      setProducts(products.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setEditFormData({
      productName: product.productName || "",
      category: product.category || "",
      price: product.price || "",
      stock: product.stock || "",
      seller: product.seller || "",
      description: product.description || "",
    });
    setEditImage(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);

    try {
      const data = new FormData();
      data.append("productName", editFormData.productName);
      data.append("category", editFormData.category);
      data.append("price", editFormData.price);
      data.append("stock", editFormData.stock);
      data.append("seller", editFormData.seller);
      data.append("description", editFormData.description);

      if (editImage) {
        data.append("image", editImage);
      }

      const response = await API.put(
        `/api/products/${editingProduct._id}`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.status === 200 || response.data.success) {
        toast.success("Product updated successfully!");
        setEditingProduct(null);
        fetchProducts(); // Refresh the list to show new data
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Manage Products</h1>
          <p style={styles.subtitle}>
            View, edit, or remove items from your catalog.
          </p>
        </div>
        <Link to="/admin/add-product" style={styles.createBtn}>
          + Add New Product
        </Link>
      </div>

      {loading ? (
        <div style={styles.loadingText}>Loading catalog...</div>
      ) : products.length === 0 ? (
        <div style={styles.emptyCard}>
          No products found. Start by creating one!
        </div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Stock</th>
                <th style={styles.th}>Seller</th>
                <th style={{ ...styles.th, textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} style={styles.tableRow}>
                  <td style={styles.td}>
                    <img
                      src={product.imageUrl || "https://via.placeholder.com/50"}
                      alt={product.productName}
                      style={styles.productImg}
                    />
                  </td>
                  <td
                    style={{ ...styles.td, fontWeight: "600", color: "#fff" }}
                  >
                    {product.productName}
                  </td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{product.category}</span>
                  </td>
                  <td
                    style={{
                      ...styles.td,
                      color: "#ff4d4d",
                      fontWeight: "bold",
                    }}
                  >
                    ${Number(product.price).toFixed(2)}
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        color: product.stock < 10 ? "#ff4d4d" : "#4ade80",
                      }}
                    >
                      {product.stock} in stock
                    </span>
                  </td>
                  <td style={styles.td}>{product.seller}</td>
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    <div style={styles.actionGroup}>
                      <button
                        onClick={() => handleEditClick(product)}
                        style={styles.editBtn}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingProduct && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h2 style={styles.modalTitle}>Edit Product</h2>
            <form onSubmit={handleUpdateSubmit} style={styles.form}>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={editFormData.productName}
                    onChange={handleEditChange}
                    required
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Category</label>
                  <input
                    type="text"
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditChange}
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    value={editFormData.price}
                    onChange={handleEditChange}
                    required
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={editFormData.stock}
                    onChange={handleEditChange}
                    required
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Seller / Brand</label>
                <input
                  type="text"
                  name="seller"
                  value={editFormData.seller}
                  onChange={handleEditChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  name="description"
                  rows="3"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  required
                  style={{ ...styles.input, resize: "vertical" }}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Replace Image (Leave blank to keep current)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditImage(e.target.files[0])}
                  style={styles.fileInput}
                />
              </div>

              <div style={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateLoading}
                  style={{
                    ...styles.saveBtn,
                    opacity: updateLoading ? 0.7 : 1,
                  }}
                >
                  {updateLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
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
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "15px",
  },
  title: { fontSize: "28px", fontWeight: "800", color: "#fff", margin: 0 },
  subtitle: { color: "#a1a1aa", fontSize: "14px", marginTop: "5px" },
  createBtn: {
    background: "linear-gradient(45deg, #ff4d4d, #cc0000)",
    color: "#fff",
    textDecoration: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "0 4px 15px rgba(255,77,77,0.3)",
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
    minWidth: "700px",
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
  productImg: {
    width: "48px",
    height: "48px",
    borderRadius: "6px",
    objectFit: "cover",
    border: "1px solid #27272a",
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    color: "#e4e4e7",
  },
  actionGroup: { display: "flex", gap: "10px", justifyContent: "center" },
  editBtn: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    border: "1px solid rgba(59, 130, 246, 0.3)",
    color: "#60a5fa",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  deleteBtn: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    color: "#f87171",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  // Modal Styles
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    padding: "20px",
  },
  modalCard: {
    backgroundColor: "#101014",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "30px",
    width: "100%",
    maxWidth: "550px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#fff",
  },
  form: { display: "flex", flexDirection: "column", gap: "15px" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "12px", fontWeight: "600", color: "#a1a1aa" },
  input: {
    padding: "10px 12px",
    backgroundColor: "#16161a",
    border: "1px solid #27272a",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
  },
  fileInput: {
    padding: "8px",
    backgroundColor: "#16161a",
    border: "1px dashed #3f3f46",
    borderRadius: "6px",
    color: "#a1a1aa",
    fontSize: "12px",
    cursor: "pointer",
  },
  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "15px",
  },
  cancelBtn: {
    padding: "10px 18px",
    backgroundColor: "transparent",
    border: "1px solid #3f3f46",
    borderRadius: "6px",
    color: "#a1a1aa",
    fontWeight: "600",
    cursor: "pointer",
  },
  saveBtn: {
    padding: "10px 18px",
    backgroundColor: "#ff4d4d",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default ManageProducts;
