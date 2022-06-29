const mongoose = require("mongoose");

const User = require("./User");
const reactionSchema = require("./Reaction");
//Thought model has thoughtText, creatdAt, username, reactions
const thoughtSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// **CREATE A VIRTUAL CALLED "reactionCount" THAT RETRIEVES THE LENGTH OF THE USER'S "reactions" ARRAY FIELD ON QUERY
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model("Thought", thoughtSchema);

// const handleError = (err) => console.error(err);

module.exports = Thought;
