const mongoose = require("mongoose");

//User model has username, email, thoughts, and friends
// **CREATE A VIRTUAL CALLED "friendCount" THAT RETRIEVES THE LENGTH OF THE USER'S "friends" ARRAY FIELD ON QUERY
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email required"],
  },
  thoughts: [thoughtSchema],
  friends: [userSchema],
});

//Thought model has thoughtText, creatdAt, username, reactions
// **CREATE A VIRTUAL CALLED "reactionCount" THAT RETRIEVES THE LENGTH OF THE USER'S "reactions" ARRAY FIELD ON QUERY
const thoughtSchema = new mongoose.Schema({
  thoughtTest: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

//ObjectId datatype for reaction Id
const Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

//Reaction is not a model! Reaction Schema has reactionId, reactionBody, username, createdAt
const reactionSchema = new mongoose.Schema({
  reactionId: ObjectId,
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
const User = mongoose.model("User", userSchema);

const handleError = (err) => console.error(err);

module.exports = User;
