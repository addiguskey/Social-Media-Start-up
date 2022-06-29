const router = require("express").Router();
const controller = require("../../controllers/userControllers");

// PREFIX: api/users

// 1.  GET all users,
router.get("/", controller.getAllUsers);

// 2. GET a single user by its _id
router.get("/:id", controller.getSingleUser);

// 3. POST new user
// can accept accept body
router.post("/", controller.postNewUser);

// 4. PUT to update user by its _id
router.put("/:id", controller.updateUser);

// 5. DELETE to remove user by its _id & their thoughts
router.delete("/:id", controller.deleteUser);

// 6. POST to add a new friend
router.post("/:userId/friends/:friendId", controller.postNewFriend);

// 7. DELETE a friend from user
router.delete("/:userId/friends/:friendId", controller.deleteFriend);

module.exports = router;
