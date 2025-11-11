import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();
app.use(cors);
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server runnin on port ${PORT}`)
})