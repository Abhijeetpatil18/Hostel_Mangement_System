const express = require("express");
const router = express.Router();
const db = require("../db");
const { getAllRooms, getSingleRoom } = require("../controllers/rooms");

router.get("/rooms", getAllRooms);
router.get("/rooms/:id", getSingleRoom);

module.exports = router;
