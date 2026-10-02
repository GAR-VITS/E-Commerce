import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { clearCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import API from "../utils/api";

const Checkout = () => {
  const { user, loading } = useContext(AuthContext);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin" || user?.isAdmin === true;

  const [address, setAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
  });

  
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );
  const shippingFee = totalPrice > 0 ? (totalPrice > 4999 ? 0 : 250) : 0;
  const grandTotal = totalPrice + shippingFee;

  if (!loading && !user) {
    return <Navigate to="/login" replace />;
  }

  const formatProductsForBackend = () => {
    return cartItems.map((item) => ({
      product: item.productId,
      quantity: item.qty,
    }));
  };

  const handlePayment = async () => {
    try {
      if (isAdmin) {
        console.log("Admin detected: Automatically routing to bypass mode...");
        toast.info(
          "Admin Account Detected: Skipping payment gateway (Automatic Bypass).",
        );
        return bypassPayment();
      }

      toast.info("Initializing payment gateway...");

    
      const { data: orderData } = await API.post(
        "/api/payment/order",
        { amount: grandTotal },
        { withCredentials: true },
      );

      const options = {
        key: "rzp_test_dummykey123",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "E-Shop",
        description: "Order Checkout",
        order_id: orderData.id,
        handler: async function (response) {
          try {
            toast.info("Verifying payment...");
            const verifyRes = await API.post(
              "/api/payment/verify",
              response,
              { withCredentials: true },
            );

            if (verifyRes.status === 200) {
              const saveOrderRes = await API.post(
                "/api/orders",
                {
                  products: formatProductsForBackend(),
                  itemsPrice: totalPrice,
                  shippingFee: shippingFee,
                  totalAmount: grandTotal,
                  address,
                  paymentId: response.razorpay_payment_id,
                },
                { withCredentials: true },
              );

              if (saveOrderRes.status === 200 || saveOrderRes.status === 201) {
                toast.success("Order placed successfully!");
                dispatch(clearCart());
                navigate("/ordersuccess");
              }
            }
          } catch (err) {
            console.error("Payment verification/saving failed:", err);
            toast.error("Order verification failed. Please contact support.");
          }
        },
        prefill: {
          name: address.fullName,
          email: user?.email || user?.emailId,
          contact: address.phoneNumber || "9999999999",
        },
        theme: {
          color: "#ff4d4d",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Razorpay Init Error:", error);
      toast.warn(
        "Razorpay keys unconfigured on backend. Processing order via Student Bypass Mode...",
      );
      return bypassPayment();
    }
  };

  const bypassPayment = async () => {
    try {
      const saveOrderRes = await API.post(
        "/api/orders",
        {
          products: formatProductsForBackend(),
          itemsPrice: totalPrice,
          shippingFee: shippingFee,
          totalAmount: grandTotal,
          address,
          paymentId: isAdmin
            ? "admin_bypass_" + Date.now()
            : "bypass_txn_" + Date.now(),
        },
        { withCredentials: true },
      );

      if (saveOrderRes.status === 200 || saveOrderRes.status === 201) {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        navigate("/ordersuccess");
      }
    } catch (error) {
      console.error("Bypass Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to save order in bypass mode.",
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty!");
      return;
    }
    handlePayment();
  };

  return (
    <div className="checkout-page">
      <style>{`
        .checkout-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          color: #ffffff;
        }

        .checkout-heading {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 30px;
          text-align: left;
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 420px;
          gap: 30px;
          align-items: start;
        }

        .shipping-card {
          background: #121215;
          border: 1px solid #222226;
          border-radius: 12px;
          padding: 28px;
        }

        .shipping-card h3 {
          font-size: 1.3rem;
          margin-bottom: 20px;
          border-bottom: 1px solid #222226;
          padding-bottom: 12px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 18px;
        }

        .input-group label {
          font-size: 0.85rem;
          color: #a0a0a0;
          margin-bottom: 6px;
        }

        .input-group input {
          background: #1a1a20;
          border: 1px solid #2d2d35;
          border-radius: 8px;
          padding: 12px 14px;
          color: #fff;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .input-group input:focus {
          border-color: #ff4d4d;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .summary-card {
          background: #121215;
          border: 1px solid #222226;
          border-radius: 12px;
          padding: 28px;
          position: sticky;
          top: 90px;
        }

        .summary-card h3 {
          font-size: 1.3rem;
          margin-bottom: 20px;
          border-bottom: 1px solid #222226;
          padding-bottom: 12px;
        }

        .cart-items-preview {
          max-height: 240px;
          overflow-y: auto;
          padding-right: 6px;
          margin-bottom: 16px;
        }

        .preview-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .preview-item img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid #222226;
        }

        .item-details {
          flex: 1;
        }

        .item-details h4 {
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .item-details p {
          font-size: 0.8rem;
          color: #888888;
        }

        .item-total {
          font-weight: 600;
          font-size: 0.95rem;
        }

        .summary-divider {
          border: 0;
          border-top: 1px solid #222226;
          margin: 16px 0;
        }

        .price-rows {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
          color: #a0a0a0;
        }

        .total-row {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
        }

        .free-tag {
          color: #22c55e;
          font-weight: 600;
        }

        .pay-now-btn {
          width: 100%;
          background: #ff4d4d;
          color: #ffffff;
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 20px;
          transition: background 0.2s ease, transform 0.1s ease;
        }

        .pay-now-btn:hover {
          background: #e63939;
        }

        .pay-now-btn:active {
          transform: scale(0.99);
        }

        .empty-cart-msg {
          color: #888888;
          font-size: 0.9rem;
          text-align: center;
          padding: 20px 0;
        }

        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }
          .input-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <h2 className="checkout-heading">Checkout</h2>

      <div className="checkout-grid">
        <div className="checkout-left">
          <form
            id="checkout-form"
            onSubmit={handleSubmit}
            className="shipping-card"
          >
            <h3>Shipping Address</h3>

            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                required
                value={address.fullName}
                onChange={(e) =>
                  setAddress({ ...address, fullName: e.target.value })
                }
              />
            </div>

            <div className="input-group">
              <label>Street Address</label>
              <input
                type="text"
                placeholder="123 Main St, Apt 4B"
                required
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>City</label>
                <input
                  type="text"
                  placeholder="Delhi City"
                  required
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
              </div>

              <div className="input-group">
                <label>State / Province</label>
                <input
                  type="text"
                  placeholder="DH"
                  required
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Zip / Postal Code</label>
                <input
                  type="text"
                  placeholder="42069"
                  required
                  value={address.zipCode}
                  onChange={(e) =>
                    setAddress({ ...address, zipCode: e.target.value })
                  }
                />
              </div>

              <div className="input-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 1234567890"
                  required
                  value={address.phoneNumber}
                  onChange={(e) =>
                    setAddress({ ...address, phoneNumber: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="input-group">
              <label>Country</label>
              <input
                type="text"
                placeholder="India"
                required
                value={address.country}
                onChange={(e) =>
                  setAddress({ ...address, country: e.target.value })
                }
              />
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Read-Only Order Summary */}
        <div className="checkout-right">
          <div className="summary-card">
            <h3>Order Summary ({cartItems.length} items)</h3>

            <div className="cart-items-preview">
              {cartItems.length === 0 ? (
                <p className="empty-cart-msg">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id || item.id} className="preview-item">
                    <img
                      src={item.imageUrl || "https://via.placeholder.com/60"}
                      alt={item.name}
                    />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>
                        Qty: {item.qty} × ₹{item.price}
                      </p>
                    </div>
                    <span className="item-total">
                      ₹{(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>

            <hr className="summary-divider" />

            <div className="price-rows">
              <div className="price-row">
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                {shippingFee === 0 ? (
                  <span className="free-tag">FREE</span>
                ) : (
                  <span>₹{shippingFee.toFixed(2)}</span>
                )}
              </div>
              <hr className="summary-divider" />
              <div className="price-row total-row">
                <span>Total Amount</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button type="submit" form="checkout-form" className="pay-now-btn">
              {isAdmin
                ? `Admin Bypass • ₹${grandTotal.toFixed(2)}`
                : `Pay Now • ₹${grandTotal.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
