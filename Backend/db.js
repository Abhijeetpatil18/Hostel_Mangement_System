require('dotenv').config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "dbms_project",
  connectionLimit: 10,
});
db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ MySQL Connected');
    connection.release();
  }
});



module.exports = db;