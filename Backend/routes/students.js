const express = require('express');
const router = express.Router();
const db = require("../db")


router.get('/students', async (req, res) => {
  const user = req.user
  try {
    const [rows] = await db.query('SELECT student_id,name,room_id,contact_no,city,state,course FROM students');
    res.json(rows);
  } catch (err) {
    // console.error(err);
    res.status(500).send('Database error');
  }
});

// GET /api/students/:id -> one student with core fields
router.get('/students/:id', async (req, res) => {
  try {
    const { id } = req.params;                        
    const [rows] = await db.execute(
      'SELECT student_id, name, room_id, state,  contact_no,  city, course   FROM students WHERE student_id = ?',
      [id]
    );
    if (!rows.length) return res.status(404).json({ message: 'Student not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});
router.post('/students', async (req, res) => {
  console.log(req.body);
  const { name, contact_no, city, state, room_id, course } = req.body;
  const query = `
    INSERT INTO students (name, contact_no, city, state, room_id, course)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    // Send data to DB with parameters
    const result = await db.query(query, [name, contact_no, city, state, room_id, course]);
    res.status(200).send("Successfully inserted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in insert");
  }
});



router.get('/about', async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM students where student_id = 111 `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});





module.exports = router