const express = require("express");
const router = express.Router();
const db = require("../db");
const { getAllFees, updateFeeStatus } = require("../controllers/fees");

router.get("/fees", getAllFees);

router.put("/fees/:id", updateFeeStatus);

module.exports = router;
