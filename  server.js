const express = require("express");
const db = require("./config/connection");
// Require model
const { User } = require("./models");

const PORT = process.env.PORT || 7001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//api/users:
// 1.  GET all users,
// 2. GET a single user by its _id
// 3. POST new user
// 4. PUT to update user by its _id
// 5. DELETE to remove user by its _id
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
