const { ObjectId } = require("mongoose").Types;
const { Thought, User, Reaction } = require("../models");

// "/api/thoughts"

module.exports = {
  // 1. GET for all thoughts
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      console.log(thoughts);
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // 2. GET to get a single thought by its _id
  getSingleThought: async (req, res) => {
    try {
      const result = await Thought.find({
        _id: ObjectId(req.params.id),
      });
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // 3. POST to create a new thought
  // (don't forget to push the created thought's _id to the associated user's "thoughts" array field)
  postNewThought: async (req, res) => {
    try {
      const newThought = await new Thought({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      });
      User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { newThought: res._id } },
        { new: true }
      );
      console.log(newThought);
      res.status(200).json(newThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // 4. PUT to update a thought by its _id
  updateThought: async (req, res) => {
    try {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: ObjectId(req.params.id) },
        { new: true }
      );
      console.log(updateThought);
      res.status(200).json(updateThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // 5. DELETE to delete a thought by its _id
  deleteThought: async (req, res) => {
    try {
      const oldThought = await Thought.findOneAndDelete({ _id: req.params.id });
      console.log(oldThought);
      res.status(200).json(oldThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // "/api/thoughts/:thoughtId/reactions"
  // 1. POST to create a reaction stored in a single thought's "reactions" array
  postNewReaction: async (req, res) => {
    try {
      const newReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }
      );
      console.log(newReaction);
      res.status(200).json(newReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // 2. DELETE to pull and remove a reaction by the reaction's "reactionId" value
  deleteReaction: async (req, res) => {
    try {
      const oldReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionsId: req.params.reactionId } } }
      );
      console.log(oldReaction);
      res.status(200).json(oldReaction);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
