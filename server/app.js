//
const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const product = require("./data/products");
var cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const app = express();
const productRoute = require("./routes/productRoute");

dotenv.config();
connectDb();
app.use(cors());
app.use("/api", productRoute);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

const port = 8005;
app.listen(process.env.PORT || port, () => {
  console.log(`${port}`);
});
