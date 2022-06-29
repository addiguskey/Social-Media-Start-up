const router = require("express").Router();
// "/api/thoughts"
// 1. GET for all thoughts
// 2. GET to get a single thought by its _id
// 3. POST to create a new thought (don't forget to push the created thought's _id to the associated user's "thoughts" array field)
// 4. PUT to update a thought by its _id
// 5. DELETE to delete a thought by its _id

// "/api/thoughts/:thoughtId/reactions"
// 1. POST to create a reaction stored in a single thought's "reactions" array
// 2. DELETE to pull and remove a reaction by th reaction's "reactionId" value
module.exports = router;
