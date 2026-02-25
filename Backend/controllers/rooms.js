const db = require("../db.js");

const getAllRooms = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM rooms");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
};

const getSingleRoom = async (req, res) => {
  const id = req.params.id;

  try {
    const [roomRows] = await db.query(
      `SELECT room_id, capacity 
       FROM rooms 
       WHERE room_id = ?`,
      [id],
    );

    // If room not found
    if (roomRows.length === 0) {
      return res.status(404).json({ message: "Room not found" });
    }

    const room = roomRows[0];
    const [studentRows] = await db.query(
      `SELECT student_id, name 
       FROM students 
       WHERE room_id = ?`,
      [id],
    );
    const [countStudents] = await db.query(
      `SELECT room_id, COUNT(*) AS No_of_students
      FROM students
      WHERE room_id = ?
      GROUP BY room_id`,
      [id],
    );

    const available = room.capacity - studentRows.length;
    console.log(available);

    const response = {
      room_id: room.room_id,
      name: room.name,
      students: studentRows,
      available: available,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
};

module.exports = {
  getAllRooms,
  getSingleRoom,
};
