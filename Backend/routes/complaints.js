const express = require('express');
const router = express.Router();
const db = require("../db")


router.get('/complaints', async (req, res) => {
  try {
    const query = `
      SELECT c.*, s.name AS student_name
      FROM complaints c
      JOIN students s ON c.student_id = s.student_id
    `;
    const rows = await db.query(query);
    // console.log(rows[0])
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

// Make sure you have: const express = require('express'); const router = express.Router();
// And that db is a configured database connection with promise support.

router.post('/complaints', async (req, res) => {
  // Read values from incoming request
  const { studentID, description } = req.body;

  // Set a default status if not provided (optional, e.g., "Open")
  const status = "Open";

  // Use your DB query insert (adjust table/columns as needed)
  const query = `
    INSERT INTO Complaints (student_id, description, status)
    VALUES (?, ?, ?)
  `;

  try {
    // Send data to DB with parameters
    const result = await db.query(query, [studentID, description, status]);
    // console.log(result);
    res.status(200).send("Successfully inserted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in insert");
  }
});







module.exports = router