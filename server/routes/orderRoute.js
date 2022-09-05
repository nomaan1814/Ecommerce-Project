const express = require("express");
const {addorderItem, getOrderById, updateOrderToPaid} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
router.route('/').post(protect,addorderItem)
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').put(protect,updateOrderToPaid)
module.exports = router;
