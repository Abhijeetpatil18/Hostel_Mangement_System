const db = require('../db.js');

// Ensure db is connected and has query method
if (!db || typeof db.query !== 'function') {
  console.error('❌ Database connection not properly initialized');
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

    // 1) check duplicates by username OR email (ensure unique indexes in DB)
    // const [exists] = await db.execute(
    //   "SELECT id FROM users WHERE name = ? OR email = ? LIMIT 1",
    //   [uname, mail]
    // );
    // if (exists.length) {
    //   return res.status(409).json({ success: false, message: "User already exists" });
    // }

    // 2) TODO: hash password before storing (e.g., bcrypt.hash)
    // const hashed = await bcrypt.hash(password, 10);

    // 3) insert user
    const [result] = await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [uname, mail, password] // replace with hashed
    );

    return res.status(201).json({
      success: true,
      message: "Registered",
      userId: result.insertId,
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