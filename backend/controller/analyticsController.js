const User = require("../model/user");
const Order = require("../model/order");
const Product = require("../model/product");
const { generateToken } = require("../utils/token");
async function getAnalyticsData(req, res) {
  try {
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();
    const productCount = await Product.countDocuments();
    const orders = await Order.find({});
    const totalRevenue = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0,
    );

    return res.status(200).json({
      userCount,
      orderCount,
      productCount,
      totalRevenue,
    });
  } catch (error) {
    console.log("Analytics Data Error", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find({}).select("-password");
    console.log("Users: ", users);
    return res.status(200).json(users);
  } catch (error) {
    console.log("Get Users Error", error);
    return res.status(500).json({ message: "Server Error" });
  }
}
async function userRole(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    user.role = role;
    await user.save();
    if (
      req.user &&
      (req.user._id?.toString() === id || req.user.id?.toString() === id)
    ) {
      const token = await generateToken(user);
      res.cookie("user", token);
    }
    return res.status(200).json({
      success: true,
      message: "User Role Updated",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Update User Role Error", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { getAnalyticsData, getUsers, userRole };
