const express = require("express");
const router = express.Router();
const db = require("../db");
const {
  getAllStudents,
  getSingleStudent,
  createStudent,
  getAbout,
} = require("../controllers/students");

router.get("/students", getAllStudents);
router.get("/students/:id", getSingleStudent);
router.post("/students", createStudent);

router.get("/about", getAbout);

module.exports = router;
