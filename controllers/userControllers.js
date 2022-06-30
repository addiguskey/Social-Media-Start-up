const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

module.exports = {
  //setting up CRUD routes for User
  //GET all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      console.log(users);
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    }
  },
  // GET single user
  getSingleUser: async (req, res) => {
    try {
      const result = await User.find({ _id: req.params.id })
        .populate({ path: "thoughts" })
        .populate({ path: "friends" });
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    }
  },
  // POST new user
  postNewUser: async (req, res) => {
    try {
      const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
      });
      newUser.save();
      console.log(newUser);
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    }
  },
  //UPDATE user
  updateUser: async (req, res) => {
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      console.log(`Updated: ${updateUser}`);
      res.status(200).json(updateUser);
    } catch (err) {
      console.log(err);
      res.status(500), json(err);
    }
  },
  // DELETE user and their thoughts (bonus)
  deleteUser: async (req, res) => {
    try {
      const oldUser = await User.findOneAndDelete(
        { _id: req.params.id }
        // { $pull: { thoughts: { thoughtsId: ObjectId(req.params.id)} } }
      );
      console.log(`${oldUser} has been deleted!`);
      res.status(200).json(oldUser);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // "/api/users/:userId/friends/:friendId"
  //POST to add new friend to a user's friend list
  postNewFriend: async (req, res) => {
    try {
      const newFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true, runValidators: true }
      );
      console.log(newFriend);
      res.status(200).json(newFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // DELETE a friends from a user's friend list
  deleteFriend: async (req, res) => {
    try {
      const oldFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      console.log(oldFriend);
      res.status(200).json(oldFriend);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
