const express = require("express");
const router = express.Router();
const product = require("../models/ProductModel");
const asynchandler = require("express-async-handler");

//Get route of all product
router.get(
  "/product",
  asynchandler(async (req, res) => {
    const products = await product.find({});
    // throw new Error("Some error");
    res.json(products);
  })
);

// get route for single product
router.get(
  "/product/:id",
  asynchandler(async (req, res) => {
    //   const p = product.find((p) => p._id === req.params.id);
    //   res.json(p);
    const p = await product.findById(req.params.id);
    if (p) {
      res.json(p);
    } else {
      res.status(404).json("Product not found");
    }
  })
);
module.exports = router;
