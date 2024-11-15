const express = require("express");
const { addForm, formVote , formList , fetchVotes } = require("../controllers/formController");
const router = express.Router();

router.route("/add").post(addForm);
router.route("/vote").post(formVote);
router.route("/list").get(formList);
router.route("/fetchVotes").post(fetchVotes);
module.exports = router;
