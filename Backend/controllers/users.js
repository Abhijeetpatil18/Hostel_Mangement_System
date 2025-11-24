const db = require('../db.js');
const jwt = require("jsonwebtoken")
require('dotenv').config();


// Ensure db is connected and has query method
if (!db || typeof db.query !== 'function') {
  console.error(' Database connection not properly initialized');
  throw new Error('Database connection not properly initialized');
}

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const mail = String(email).trim().toLowerCase();

    // Single query with AND, parameterized, and alias to 'id'
    const [rows] = await db.execute(
      "SELECT user_id AS id, name, email FROM users WHERE email = ? AND password = ? LIMIT 1",
      [mail, password]
    );

    if (!rows.length) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // success
    const user = rows[0];
    return res.status(200).json({
      success: true,
      message: "Login success",
      name:user.name
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};




const userRegister =async (req, res) => {
  try {
    const { username, email, password } = req.body || {};
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // optional: basic normalization
    const uname = String(username).trim();
    const mail = String(email).trim().toLowerCase();

      var token = jwt.sign({ email: req.body.email }, process.env.SECRET);


    // 3) insert user
    const [result] = await db.execute(
      "INSERT INTO users (name, email, password, jwt_token) VALUES (?,?,?,?)",
      [uname, mail, password,token] // replace with hashed
    );

    return res.status(201).json({
      success: true,
      message: "Registered",
      userId: result.insertId,
      token : token
    });
  } catch (error) {
    console.error("Register error:", error);
    // duplicate key safety net (in case unique index throws)
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ success: false, message: "Username or email already in use" });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
}


module.exports = {
    userLogin,
    userRegister
}