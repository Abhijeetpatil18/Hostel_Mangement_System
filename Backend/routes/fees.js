const express = require('express');
const router = express.Router();
const db = require("../db")


router.get('/fees', async (req, res) => {
  try {
    const query = 'select s.name,f.amount,f.status from students s join fees f where  s.student_id = f.student_id'
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});





module.exports = router