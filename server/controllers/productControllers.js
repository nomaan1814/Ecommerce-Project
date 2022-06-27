const product = require("../models/ProductModel");
const asynchandler = require("express-async-handler");
exports.getProducts = asynchandler(async (req, res) => {
  const products = await product.find({});
  // throw new Error("Some error");
  res.json(products);
});
exports.getProduct = asynchandler(async (req, res) => {
  //   const p = product.find((p) => p._id === req.params.id);
  //   res.json(p);
  const p = await product.findById(req.params.id);
  if (p) {
    res.json(p);
  } else {
    res.status(404).json("Product not found");
  }
});

// module.exports = { getProducts, getProduct };
