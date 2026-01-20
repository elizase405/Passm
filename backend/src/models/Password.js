const { time } = require("console");
const mongoose = require("mongoose");
const { ref } = require("process");

const passwordSchema = new mongoose.Schema({
    site: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Password', passwordSchema);