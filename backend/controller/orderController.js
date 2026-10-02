const Order = require("../model/order");
const Product = require("../model/product");
const { sendMail } = require("../utils/mailService");

async function createOrder(req, res) {
  try {
    const { products, address, paymentId } = req.body;

    if (!products || products.length === 0 || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const productIds = products.map((item) => item.product);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    if (dbProducts.length !== productIds.length) {
      return res.status(400).json({ message: "One or more products do not exist" });
    }

    let calculatedSubtotal = 0;
    const orderItems = [];

    for (const item of products) {
      const productDetails = dbProducts.find(
        (p) => p._id.toString() === item.product.toString()
      );

      const qty = item.quantity || item.qty || 1;
      const itemPrice = productDetails.price || 0;

      calculatedSubtotal += itemPrice * qty;
      orderItems.push({
        product: productDetails._id,
        quantity: qty,
        price: itemPrice,
        name: productDetails.productName || "PRODUCT",
        image: productDetails.imageUrl || "https://via.placeholder.com/300x200?text=No+Image"
      });
    }

    // Calculate Shipping Fee (Free above ₹4999, else ₹250)
    const shippingFee = calculatedSubtotal > 0 ? (calculatedSubtotal > 4999 ? 0 : 250) : 0;
    const grandTotal = calculatedSubtotal + shippingFee;

    const order = new Order({
      user: req.user.id,
      products: orderItems,
      itemsPrice: calculatedSubtotal,
      shippingFee: shippingFee,
      totalAmount: grandTotal, // Includes shipping fee in total
      address,
      paymentId: paymentId,
    });

    const savedOrder = await order.save();

    const itemsHtml = savedOrder.products
      .map((item) => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        return `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eeeeee; width: 70px;">
        <img src="${item.image}" alt="${item.name}" width="60" height="60" style="border-radius: 6px; object-fit: cover; display: block; border: 1px solid #ddd;" />
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #eeeeee; font-family: Arial, sans-serif; color: #333333;">
        <strong style="font-size: 15px; color: #111111;">${item.name}</strong><br />
        <span style="font-size: 13px; color: #666666;">Qty: ${item.quantity} × ₹${item.price}</span>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #eeeeee; font-family: Arial, sans-serif; color: #333333; text-align: right; font-weight: bold; font-size: 15px;">
        ₹${itemTotal}
      </td>
    </tr>
  `;
      })
      .join("");

    const emailHtml = `
  <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
    <div style="background-color: #ff4d4d; color: #ffffff; padding: 24px; text-align: center;">
      <h2 style="margin: 0; font-size: 24px;">Order Confirmed! 🎉</h2>
    </div>
    <div style="padding: 24px;">
      <p style="color: #333333; font-size: 16px; margin-top: 0;">Hi there,</p>
      <p style="color: #555555; font-size: 15px; line-height: 1.5;">
        Thank you for shopping with us! Your order <strong>#${order._id}</strong> has been successfully placed. Here is a summary of your purchase:
      </p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <!-- Payment Summary Breakdown -->
      <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #222222;">
        <div style="display: flex; justify-content: space-between; font-size: 14px; color: #555555; margin-bottom: 6px;">
          <span>Items Subtotal:</span>
          <span>₹${calculatedSubtotal.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 14px; color: #555555; margin-bottom: 10px;">
          <span>Shipping Fee:</span>
          <span>${shippingFee === 0 ? '<strong style="color: #22c55e;">FREE</strong>' : `₹${shippingFee.toFixed(2)}`}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 18px; color: #111111; padding-top: 10px; border-top: 1px solid #eeeeee;">
          <strong>Total Amount:</strong>
          <strong style="color: #ff4d4d;">₹${savedOrder.totalAmount.toFixed(2)}</strong>
        </div>
      </div>
    </div>
    <div style="background-color: #f8f9fa; color: #888888; text-align: center; padding: 16px; font-size: 12px; border-top: 1px solid #eeeeee;">
      <p style="margin: 0;">If you have any questions regarding your order, simply reply to this email.</p>
    </div>
  </div>
`;

    await sendMail(
      req.user.email,
      `Order Confirmation - #${order._id}`,
      emailHtml
    );

    return res.status(201).json({ success: true, orderId: order._id });
  } catch (error) {
    console.log("Order Creation Error: ", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await Order.find({}).populate("user", "name email").populate("products.product");
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    return res.status(200).json({ orders });
  } catch (error) {
    console.log("Error while getting orders", error);
    return res
      .status(500)
      .json({ message: "Error Encountered While Fetching" });
  }
}

async function getmyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "products.product",
    );
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    return res.status(200).json({ orders });
  } catch (error) {
    console.log("Error while getting orders", error);
    return res
      .status(500)
      .json({ message: "Error Encountered While Fetching" });
  }
}

async function getOrderById(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("products.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.user.toString() !== req.user.id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden Access" });
    }
    return res.status(200).json({ order });
  } catch (error) {
    console.log("Error while getting order by ID", error);
    return res
      .status(500)
      .json({ message: "Error Encountered While Fetching" });
  }
}

async function updateOrder(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    await order.save();
    return res.status(200).json({ message: "Order updated successfully" });
  } catch (error) {
    console.log("Error while updating order", error);
    return res
      .status(500)
      .json({ message: "Error Encountered While Updating" });
  }
}

async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log("Error while deleting order", error);
    return res
      .status(500)
      .json({ message: "Error Encountered While Deleting" });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getmyOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
