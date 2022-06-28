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
app.get("/api/users", async (req, res) => {
  try {
    const result = await User.find({});
    console.log(result);
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

// 2. GET a single user by its _id
app.get("/api/uers/:id", async (req, res) => {
  try {
    const result = await User.find({ _id: req.body.id });
    console.log(result);
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

// 3. POST new user
app.post("/api/users/:id", async (req, res) => {
  try {
    const newUser = await new User({ uername: req.params.username });
    newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

// 4. PUT to update user by its _id
app.put("/api/users/:id", async (req, res) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { username: req.params.username },
      { new: true }
    );
    res.status(200).json(result);
    console.log(`Updated: ${updateUser}`);
  } catch (err) {
    res.status(500), json(err);
  }
});
// 5. DELETE to remove user by its _id
app.delete("/api/users/:id", async (req, res) => {
  try {
    const oldUser = await User.findOneAndDelete({
      username: req.params.username,
    });
    res.status(200).json(oldUser);
  } catch (err) {
    res.status(500).json(err);
  }
});
//BONUS: remove a user's associated thoughts when deleted

// "/api/users/:userId/friends/:friendId"
// 1. POST to add new friend to a user's friend list
// 2. DELETE to remove a friend from a user's friend list

// "/api/thoughts"
// 1. GET for all thoughts
// 2. GET to get a single thought by its _id
// 3. POST to create a new thought (don't forget to push the created thought's _id to the associated user's "thoughts" array field)
// 4. PUT to update a thought by its _id
// 5. DELETE to delete a thought by its _id

// "/api/thoughts/:thoughtId/reactions"
// 1. POST to create a reaction stored in a single thought's "reactions" array
// 2. DELETE to pull and remove a reaction by th reaction's "reactionId" value
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
