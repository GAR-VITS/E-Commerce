const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {type: String, required: true},
    description: {type: String, required: true},
    price: {type:String, required: true},
    rating: {type: Number, default: 0},
    category: {type: String, required: true},
    seller: {type: String, required: true},
    stock: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})


const Product = mongoose.model("Product", productSchema);

module.exports = Product;