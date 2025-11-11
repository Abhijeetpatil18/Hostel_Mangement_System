require('dotenv').config();
const express = require("express");
const db = require('./db')
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/users')
const studentsRoutes = require('./routes/students')
const roomRoutes = require('./routes/rooms')
const complaintRoutes = require('./routes/complaints')
const stsffRoutes = require("./routes/Staff")
const feesRoutes = require('./routes/fees')

const app = express();
app.use(cors());
app.use(bodyParser.json());





// user Routes
app.use("/",userRoutes);
app.use("/api/",studentsRoutes)
app.use("/api/",roomRoutes)
app.use("/",complaintRoutes)
app.use("/",stsffRoutes)
app.use('/students',feesRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
