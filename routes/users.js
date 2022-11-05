const router = require("express").Router();

const {userUpdate, userDelete, getUser, passwordReset, } = require("../controllers/userController");

//UPDATE

 router.route("/:id").put(userUpdate)
 
//DELETE
router.route("/:id").delete(userDelete) 

//GET USER
router.route("/:id").get(getUser)

// handles the change password request
router.route('/reset').post(passwordReset)

module.exports = router;
