const bcrypt = require("bcryptjs");
const Users = [
  {
    name: "Admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "nomaan",
    email: "nomaan@gmail.com",
    password: bcrypt.hashSync("12345678", 10),
  },
  {
    name: "new user",
    email: "newuser@gmail.com",
    password: bcrypt.hashSync("12345678", 10),
  },
];
module.exports = Users;
