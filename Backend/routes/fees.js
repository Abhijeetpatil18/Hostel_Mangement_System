const express = require('express');
const router = express.Router();
const db = require("../db")


router.get('/fees', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM fees');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.get('/fees/:id', async (req, res) => {
    const id = +req.params.id
    // console.log(req.params)
    try {
        const [rows] = await db.query('SELECT * FROM fees');
        const student = rows.find((student) => student.student_id === id);
        console.log(student);
        res.send(student)
    } catch (error) {
        console.log(error)
        res.status(404).send("student not found")
    }
});



module.exports = router