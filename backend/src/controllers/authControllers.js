const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt);
        
        const user = await User.create({ username, password: passwordHash });

        if (user) {
            res.status(201).json({ message: "User created successfully", id: user._id });
        } else {
            res.status(400).json({ message: "Unable to register user! please try again." });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Some error occured! Please try again", });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) return res.status(400).json({ message: "Invalid credentials" })

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "30m" })

        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 24 * 60 * 60 *1000 });

        res.json({ message: "Logged in successfully", token })
    } catch (e) {
        return res.status(500).json({ message: "Some error occured! Please try again" })
    }
}

const getAuthenticatedUser = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ id: decoded.id, username: decoded.username })
    } catch (err) {
        res.status(500).json({ err: "Server error occured" })
        console.error("Server error: ", err)
    }
}

const logOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })
        res.json({ message: "Logged Out successfully" })
    } catch (err) {
        res.status(500).json({ err: "Server error occured" })
        console.error("Server error: ", err)
    }
}

module.exports = { register, login, getAuthenticatedUser, logOut }