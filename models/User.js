const mongoose = require("mongoose");
const Thought = require("./Thought");
const Schema = mongoose.Types;
// const reactionSchema = require("./Reaction");
//User model has username, email, thoughts, and friends
const userSchema = new mongoose.Schema(
  {
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
    thoughts: [
      {
        type: Schema.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// **CREATE A VIRTUAL CALLED "friendCount" THAT RETRIEVES THE LENGTH OF THE USER'S "friends" ARRAY FIELD ON QUERY
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = mongoose.model("User", userSchema);
// const handleError = (err) => console.error(err);

module.exports = User;
