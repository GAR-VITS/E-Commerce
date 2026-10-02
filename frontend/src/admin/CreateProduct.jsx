import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from "../utils/api";
const CreateProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    price: '',
    category: '',
    seller: '',
    stock: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append('productName', formData.productName);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('seller', formData.seller);
      data.append('stock', formData.stock);
      
      if (formData.image) {
        data.append('image', formData.image);
      }

      const response = await API.post("/api/products", data, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success('Product created successfully!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(error.response?.data?.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add New Product</h2>
        <p style={styles.subtitle}>Fill in the details to list a new item in your store.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Product Name *</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="e.g., Wireless Noise-Cancelling Headphones"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Category *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g., Electronics"
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="299.99"
                step="0.01"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="50"
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Seller Name / Brand *</label>
            <input
              type="text"
              name="seller"
              value={formData.seller}
              onChange={handleChange}
              placeholder="e.g., Sony Official Store"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the product..."
              required
              rows="4"
              style={{ ...styles.input, resize: 'vertical' }}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Product Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
            />
            {imagePreview && (
              <div style={styles.previewContainer}>
                <img src={imagePreview} alt="Preview" style={styles.previewImage} />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Uploading to Cloudinary...' : '+ Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    backgroundColor: '#050507',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 20px',
    color: '#ffffff',
  },
  card: {
    backgroundColor: '#101014',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '12px',
    padding: '35px',
    width: '100%',
    maxWidth: '650px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '8px',
    color: '#ffffff',
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: '14px',
    marginBottom: '25px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#e5e7eb',
  },
  input: {
    padding: '12px 14px',
    backgroundColor: '#16161a',
    border: '1px solid #27272a',
    borderRadius: '6px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  fileInput: {
    padding: '10px',
    backgroundColor: '#16161a',
    border: '1px dashed #3f3f46',
    borderRadius: '6px',
    color: '#a1a1aa',
    fontSize: '13px',
    cursor: 'pointer',
  },
  previewContainer: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#0a0a0c',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #27272a',
  },
  previewImage: {
    maxHeight: '150px',
    borderRadius: '4px',
    objectFit: 'contain',
  },
  submitBtn: {
    marginTop: '10px',
    padding: '14px',
    backgroundColor: '#ff4d4d',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '700',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 15px rgba(255, 77, 77, 0.3)',
  },
};

export default CreateProduct;