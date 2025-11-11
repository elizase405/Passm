import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({ email, passwordHash });
        res.json({ message: "User created successfully", id: user._id });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) return res.status(400).json({ message: "Invalid credentials" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
        })

        res.json({ message: "Logged in", token })
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}
