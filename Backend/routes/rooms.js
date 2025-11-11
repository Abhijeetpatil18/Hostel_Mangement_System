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





module.exports = router