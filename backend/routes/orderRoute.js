const express = require('express');
const {access, authorize} = require('../middleware/authService');
const {createOrder, getOrders, getOrderById, updateOrder, deleteOrder,getmyOrders} = require('../controller/orderController');

const router = express.Router();

router.route('/').get(access, authorize, getOrders).post(access, createOrder);
router.route('/myorders').get(access, getmyOrders);
router.route('/:id').get(access, getOrderById).put(access, authorize, updateOrder).delete(access, authorize, deleteOrder);


module.exports = router;