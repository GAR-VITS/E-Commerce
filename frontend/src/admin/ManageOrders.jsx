import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import API from "../utils/api";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(null);

  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await API.get("/api/orders", {
        withCredentials: true,
      });
      setOrders(response.data.orders || []);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setOrders([]);
      } else {
        console.error('Error fetching orders:', error);
        toast.error('Failed to load orders.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setStatusUpdating(orderId);
      const response = await API.put(
        `/api/orders/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
        }
        toast.success(`Order status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.response?.data?.message || 'Failed to update order status');
    } finally {
      setStatusUpdating(null);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await API.delete(`/api/orders/${orderId}`, {
        withCredentials: true,
      });
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(null);
      }
      toast.success('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error(error.response?.data?.message || 'Failed to delete order');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return { bg: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', border: '#4ade80' };
      case 'Shipped': return { bg: 'rgba(168, 85, 247, 0.1)', color: '#c084fc', border: '#c084fc' };
      case 'Processing': return { bg: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '#60a5fa' };
      case 'Cancelled': return { bg: 'rgba(239, 68, 68, 0.1)', color: '#f87171', border: '#f87171' };
      default: return { bg: 'rgba(234, 179, 8, 0.1)', color: '#facc15', border: '#facc15' };
    }
  };

  const renderAddress = (address) => {
    if (!address) return <span style={{ color: '#a1a1aa' }}>No shipping address provided.</span>;
    if (typeof address === 'string') return <div>{address}</div>;
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: '1.5' }}>
        {(address.street || address.addressLine1 || address.address) && (
          <div>{address.street || address.addressLine1 || address.address}</div>
        )}
        {(address.addressLine2 || address.locality || address.landmark) && (
          <div>{address.addressLine2 || address.locality || address.landmark}</div>
        )}
        <div>
          {[address.city, address.state, address.pincode || address.zip || address.postalCode]
            .filter(Boolean)
            .join(', ')}
        </div>
        {address.country && <div>{address.country}</div>}
        {(address.phone || address.mobile || address.phoneNumber) && (
          <div style={{ marginTop: '6px', color: '#a1a1aa' }}>
            <span style={styles.label}>Contact Phone: </span> 
            <span style={{ color: '#fff', fontWeight: '600' }}>{address.phone || address.mobile || address.phoneNumber}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Manage Orders</h1>
        <p style={styles.subtitle}>Monitor customer purchases, update shipping statuses, and view order details.</p>
      </div>

      {loading ? (
        <div style={styles.loadingText}>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div style={styles.emptyCard}>No orders found in the database.</div>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Order ID</th>
                <th style={styles.th}>Customer</th>
                <th style={styles.th}>Total Items</th>
                <th style={styles.th}>Total Amount</th>
                <th style={styles.th}>Status</th>
                <th style={{ ...styles.th, textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const statusStyle = getStatusColor(order.status);
                const totalAmount = order.totalAmount || order.products?.reduce((acc, item) => {
                  const itemPrice = item.price !== undefined ? item.price : (item.product?.price || 0);
                  return acc + itemPrice * (item.quantity || 1);
                }, 0) || 0;
                
                return (
                  <tr key={order._id} style={styles.tableRow}>
                    <td style={{ ...styles.td, fontFamily: 'monospace', color: '#ff4d4d' }}>
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: '600', color: '#fff' }}>{order.user?.name || 'Guest User'}</div>
                      <div style={{ fontSize: '12px', color: '#a1a1aa' }}>{order.user?.email || 'No email provided'}</div>
                    </td>
                    <td style={styles.td}>
                      {order.products?.length || 0} item(s)
                    </td>
                    <td style={{ ...styles.td, fontWeight: 'bold', color: '#fff' }}>
                      ₹{Number(totalAmount).toFixed(2)}
                    </td>
                    <td style={styles.td}>
                      <select
                        value={order.status || 'Pending'}
                        disabled={statusUpdating === order._id}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        style={{
                          ...styles.statusSelect,
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color,
                          borderColor: statusStyle.border,
                        }}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt} style={styles.optionItem}>{opt}</option>
                        ))}
                      </select>
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                      <div style={styles.actionGroup}>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          style={styles.viewBtn}
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleDelete(order._id)}
                          style={styles.deleteBtn}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>Order Details</h2>
                <span style={{ fontFamily: 'monospace', color: '#ff4d4d', fontSize: '14px' }}>
                  ID: #{selectedOrder._id}
                </span>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={styles.closeBtn}>&times;</button>
            </div>

            <div style={styles.modalSection}>
              <h3 style={styles.sectionHeading}>Customer Information</h3>
              <div style={styles.detailGrid}>
                <div><span style={styles.label}>Name:</span> {selectedOrder.user?.name || 'N/A'}</div>
                <div><span style={styles.label}>Email:</span> {selectedOrder.user?.email || 'N/A'}</div>
                <div><span style={styles.label}>User ID:</span> <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{selectedOrder.user?._id || 'N/A'}</span></div>
                <div>
                  <span style={styles.label}>Current Status:</span> 
                  <span style={{ 
                    marginLeft: '8px',
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px', 
                    fontWeight: 'bold',
                    ...getStatusColor(selectedOrder.status) 
                  }}>
                    {selectedOrder.status || 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            <div style={styles.modalSection}>
              <h3 style={styles.sectionHeading}>Shipping Address</h3>
              <div style={{ fontSize: '14px', color: '#d4d4d8', marginTop: '10px' }}>
                {renderAddress(selectedOrder.address)}
              </div>
            </div>

            <div style={styles.modalSection}>
              <h3 style={styles.sectionHeading}>Ordered Items</h3>
              <div style={styles.itemsList}>
                {selectedOrder.products?.map((item, idx) => {
                  const name = item.name || item.product?.productName || 'Product Unavailable';
                  const image = item.image || item.product?.imageUrl || 'https://via.placeholder.com/50';
                  const price = item.price !== undefined ? item.price : (item.product?.price || 0);
                  const qty = item.quantity || item.qty || 1;

                  return (
                    <div key={idx} style={styles.itemRow}>
                      <img
                        src={image}
                        alt={name}
                        style={styles.itemImg}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', color: '#fff', fontSize: '14px' }}>
                          {name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#a1a1aa' }}>
                          Category: {item.product?.category || 'General'} | Seller: {item.product?.seller || 'Store'}
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 'bold', color: '#ff4d4d' }}>
                          ₹{Number(price).toFixed(2)}
                        </div>
                        <div style={{ fontSize: '12px', color: '#a1a1aa' }}>
                          Qty: {qty}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={styles.modalFooter}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={styles.label}>Update Status:</span>
                <select
                  value={selectedOrder.status || 'Pending'}
                  disabled={statusUpdating === selectedOrder._id}
                  onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                  style={{
                    ...styles.statusSelect,
                    ...getStatusColor(selectedOrder.status),
                  }}
                >
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt} style={styles.optionItem}>{opt}</option>
                  ))}
                </select>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={styles.doneBtn}>
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    backgroundColor: '#050507',
    padding: '40px 5%',
    color: '#ffffff',
  },
  header: { marginBottom: '30px' },
  title: { fontSize: '28px', fontWeight: '800', color: '#fff', margin: 0 },
  subtitle: { color: '#a1a1aa', fontSize: '14px', marginTop: '5px' },
  loadingText: { textAlign: 'center', padding: '50px', color: '#a1a1aa', fontSize: '18px' },
  emptyCard: {
    textAlign: 'center',
    padding: '50px',
    backgroundColor: '#101014',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.05)',
    color: '#a1a1aa',
  },
  tableWrapper: {
    overflowX: 'auto',
    backgroundColor: '#101014',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
  },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '750px' },
  tableHeaderRow: {
    backgroundColor: '#16161a',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  th: { padding: '16px', fontSize: '13px', fontWeight: '700', color: '#a1a1aa', textTransform: 'uppercase' },
  tableRow: { borderBottom: '1px solid rgba(255, 255, 255, 0.05)', transition: 'background 0.2s' },
  td: { padding: '16px', fontSize: '14px', color: '#d4d4d8', verticalAlign: 'middle' },
  statusSelect: {
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '700',
    borderWidth: '1px',
    borderStyle: 'solid',
    outline: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  optionItem: { backgroundColor: '#101014', color: '#fff' },
  actionGroup: { display: 'flex', gap: '10px', justifyContent: 'center' },
  viewBtn: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    color: '#60a5fa',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#f87171',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  modalOverlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 2000, padding: '20px',
  },
  modalCard: {
    backgroundColor: '#101014', border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px', padding: '30px', width: '100%', maxWidth: '650px',
    maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
    display: 'flex', flexDirection: 'column', gap: '20px',
  },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  modalTitle: { fontSize: '22px', fontWeight: '800', color: '#fff', margin: 0 },
  closeBtn: { background: 'none', border: 'none', color: '#a1a1aa', fontSize: '24px', cursor: 'pointer' },
  modalSection: {
    backgroundColor: '#16161a', padding: '16px', borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  sectionHeading: { fontSize: '14px', fontWeight: '700', color: '#ff4d4d', textTransform: 'uppercase', marginBottom: '12px', margin: 0 },
  detailGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px', color: '#d4d4d8', marginTop: '10px' },
  label: { color: '#a1a1aa', fontWeight: '600' },
  itemsList: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px', maxHeight: '250px', overflowY: 'auto' },
  itemRow: {
    display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '10px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  itemImg: { width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover', border: '1px solid #27272a' },
  modalFooter: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap', gap: '15px',
  },
  doneBtn: {
    padding: '8px 18px', backgroundColor: '#ff4d4d', border: 'none',
    borderRadius: '6px', color: '#fff', fontWeight: '700', cursor: 'pointer',
  },
};

export default ManageOrders;