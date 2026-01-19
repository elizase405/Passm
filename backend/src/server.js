const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./database/db.js");
const authRoutes = require("./routes/authRoutes.js");
const passwordRoutes = require("./routes/passwordRoutes.js");

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

//Set middleware
app.set("view engine", "ejs") 
app.use(express.static('public')) 
app.use(express.urlencoded({extended: true})) 

app.use("/api/auth", authRoutes);
app.use("/api/password", passwordRoutes);

app.get("/", (req, res) => {
    res.send("Auth API running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})