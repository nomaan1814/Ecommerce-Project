const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`DB connected ${conn.connection.host}`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
};
module.exports = connectDb;
