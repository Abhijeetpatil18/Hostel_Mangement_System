const express = require("express");
const router = express.Router();
const db = require("../db");
const {
  getAllComplaints,
  createComplaint,
  deleteComplaint,
} = require("../controllers/complaints");

router.get("/complaints", getAllComplaints);

router.post("/complaints", createComplaint);

router.delete("/complaints/:id", deleteComplaint);

module.exports = router;
