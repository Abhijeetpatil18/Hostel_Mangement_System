const express = require('express');
const router = express.Router();
const db = require("../db")


router.get('/staff', async (req, res) => {
  try {
    const query ='SELECT * FROM staff'
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database fetch error');
  }
});





module.exports = router