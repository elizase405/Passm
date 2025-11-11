const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true }
})

// add method comparePassword to compare given password with stored password 
userSchema.methods.comparePassword = async function (pwd) {
    return bcrypt.compare(pwd, this.password)
}

module.exports = mongoose.model("User", userSchema);