const express = require('express');
const { addOrderItems, getMyOrders, getOrders, updateOrderStatus, requestRefund } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/refund').post(protect, requestRefund);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

module.exports = router;
