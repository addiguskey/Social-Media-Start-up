const router = require("express").Router();
const controller = require("../../controllers/thoughtControllers");

// PREFIX: "/api/thoughts"

// 1. GET for all thoughts
router.get("/", controller.getAllThoughts);

// 2. GET to get a single thought by its _id
router.get("/:id", controller.getSingleThought);

// 3. POST to create a new thought
router.post("/", controller.postNewThought);

// 4. PUT to update a thought by its _id
router.put("/:id", controller.updateThought);

// 5. DELETE to delete a thought by its _id
router.delete("/:id", controller.deleteThought);

// "/api/thoughts/:thoughtId/reactions"
// 6. POST to create a reaction stored in a single thought's "reactions" array
router.post("/:thoughtId/reactions", controller.postNewReaction);

// 7. DELETE to pull and remove a reaction by th reaction's "reactionId" value
router.delete("/:thoughtId/reactions", controller.deleteReaction);

module.exports = router;
