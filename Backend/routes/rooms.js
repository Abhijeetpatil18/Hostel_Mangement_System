const express = require('express');
const router = express.Router();
const db = require("../db")


router.get('/rooms', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM rooms');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});
router.get("/rooms/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // 1️⃣ Fetch room details
    const [roomRows] = await db.query(
      `SELECT room_id, capacity 
       FROM rooms 
       WHERE room_id = ?`,
      [id]
    );

    // If room not found
    if (roomRows.length === 0) {
      return res.status(404).json({ message: "Room not found" });
    }

    const room = roomRows[0];

    // 2️⃣ Fetch students of that room
    const [studentRows] = await db.query(
      `SELECT student_id, name 
       FROM students 
       WHERE room_id = ?`,
      [id]
    );
    const availble = room.capacity - studentRows.length;
    console.log(availble)

    // 3️⃣ Build final response
    const response = {
      room_id: room.room_id,
      name: room.name,
      capacity: room.capacity,
      students: studentRows,
      availble:availble
    };

    res.json(response);

  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});







module.exports = router