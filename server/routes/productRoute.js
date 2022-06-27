const express = require("express");
const {
  getProducts,
  getProduct,
} = require("../controllers/productControllers");

const router = express.Router();

//Get route of all product
router.route("/product").get(getProducts);

// get route for single product
router.route("/product/:id").get(getProduct);
module.exports = router;
