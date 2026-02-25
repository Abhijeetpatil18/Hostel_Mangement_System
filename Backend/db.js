require("dotenv").config();
const mysql = require("mysql2/promise");

const db = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "dbms_project",
    connectionLimit: 10,
  })
  .then((pool) => {
    console.log(" MySQL Connected");
    return pool;
  })
  .catch((err) => {
    console.error(" Database connection failed:", err.message);
    process.exit(1);
  });

module.exports = db;
