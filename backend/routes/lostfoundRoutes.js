const express = require("express");
const {addLostAndFound,getLostAndFound,deleteItem} = require("../controllers/lostandfoundController");
const router = express.Router();


router.route("/add").post(addLostAndFound);
router.route("/list").get(getLostAndFound);
router.route("/remove/:id").delete(deleteItem);



module.exports = router;
