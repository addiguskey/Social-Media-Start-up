const mongoose = require("mongoose");

const User = require("./User");
const Thought = require("./Thought");

//ObjectId datatype for reaction Id
const Schema = mongoose.Types;
let ObjectId = Schema.ObjectId;

//Reaction is not a model! Reaction Schema has reactionId, reactionBody, username, createdAt
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: ObjectId,
    default: new ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// const Reaction = mongoose.Schema("Reaction", reactionSchema);

// const handleError = (err) => console.error(err);

module.exports = reactionSchema;
