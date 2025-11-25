const express = require('express');
const router = express.Router();
const db = require("../db")


router.get('/fees', async (req, res) => {
  try {
    const query = 'select fee_id, s.name,f.amount,f.status from students s join fees f where  s.student_id = f.student_id'
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

router.put('/fees/:id',async(req,res)=>{
  const id = req.params.id;
  const {status} = req.body;
  let amount = 0;
  if(status == "Paid" ){
    amount = 30000;
  } 
  else amount = 20000;

  try {
    const query = `update fees set status = ?, amount = ? where fee_id = ?`
    const [rows] = await db.query(query,[status, amount, id])

    res.json({
      success:true,
      message:rows.info
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Failed to update')
  }
})





module.exports = router