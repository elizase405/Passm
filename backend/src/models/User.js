import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
})

// add method comparePassword to compare given password with stored password 
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.passwordHash)
}

export default mongoose.model("User", userSchema);