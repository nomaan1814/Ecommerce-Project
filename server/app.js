//
const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const product = require("./data/products");
var cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const app = express();
const productRoute = require("./routes/productRoute");
const usersRoute = require("./routes/usersRoute");

dotenv.config();
connectDb();

app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use("/api", productRoute);
app.use("/api/users", usersRoute);

app.get("/", (req, res) => {
  res.send("<h1>Welcome</h1>");
});

const port = 8005;
app.listen(process.env.PORT || port, () => {
  console.log(`${port}`);
});
