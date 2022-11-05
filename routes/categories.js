const router = require("express").Router();

const categoryController = require("../controllers/categoryController")

router.route("/").post(categoryController.postCategory) 



router.route("/").get(categoryController.getCategory)



module.exports = router;
