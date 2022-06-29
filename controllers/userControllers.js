const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

//ObjectId datatype for reaction Id
// const Schema = mongoose.Types;
// let ObjectId = Schema.ObjectId;

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
      const result = await User.find({ _id: ObjectId(req.params.id) });
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
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
      });
      newUser.save();
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
        { _id: ObjectId(req.params.id) },
        { new: true }
      );
      res.status(200).json(updateUser);
      console.log(`Updated: ${updateUser}`);
    } catch (err) {
      console.log(err);
      res.status(500), json(err);
    }
  },
  // DELETE user and their thoughts (bonus)
  deleteUser: async (req, res) => {
    try {
      const oldUser = await User.findOneAndDelete(
        { _id: req.params.userId },
        { $pull: { thoughts: { thoughtsId: req.params.thoughtsId } } }
      );
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
        { $addToSet: { friends: req.body } }
      );
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
        { $pull: { friends: { friendsId: req.params.friendsId } } }
      );
      res.status(200).json({ message: `${oldFriend} has been removed!` });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
