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
const jwt = require("jsonwebtoken")

const app = express();
app.use(cors());
app.use(bodyParser.json());



const auth = ((req,res,next)=>{
    try {
  const authHeader = req.headers.authorization;
    // console.log(header)
    const token = header.split("Bearer ")[1]
    var decoded = jwt.verify(authHeader, process.env.SECRET);
    req.user = decoded;
    console.log(decoded)
    next();
    } catch (error) {
        res.status(401).send("Unauthorized")
    }
         

}
)


// user Routes
app.use("/",userRoutes);
app.use("/api/",studentsRoutes)
app.use("/api/",roomRoutes)
app.use("/api/",feesRoutes)
app.use("/",complaintRoutes)
app.use("/",stsffRoutes)
app.use('/students',feesRoutes)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
