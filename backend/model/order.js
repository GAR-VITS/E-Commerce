const mongoose = require('mongoose');
const User = require('../model/user');
const Product = require('../model/product');
const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
        quantity: {type: Number, required: true, min: 1},
        price: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String }
    }],
    totalAmount: {type: Number, required: true},
    address: {fullName: {type: String, required: true},
    street: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipCode: {type: String, required: true},
    country: {type: String, required: true},
    phoneNumber: {type: String, required: true}},
    paymentId: {type: String },
    status: {type: String, enum: ['Pending', 'Completed', 'Cancelled', 'Processing', 'Shipped', 'Delivered'], default: 'Pending'},
    createdAt: {type: Date, default: Date.now},
},{timestamps: true});


const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
