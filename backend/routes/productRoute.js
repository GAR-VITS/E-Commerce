require('dotenv').config();
const express = require('express');
const {access, authorize} = require('../middleware/authService');
const {getProducts, createProduct, getProductById, updateProduct, deleteProduct} = require('../controller/productController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();


router.route('/').get(getProducts).post(access, authorize, upload.single('image'), createProduct);

router.route('/:id').get(getProductById).put(access, authorize,upload.single('image'), updateProduct).delete(access, authorize, deleteProduct);

module.exports = router;