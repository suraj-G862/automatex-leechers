const express = require("express");
const { addForm, formVote } = require("../controllers/formController");
const router = express.Router();

router.route("/").post(addForm);
router.route("/vote").post(formVote);
module.exports = router;
