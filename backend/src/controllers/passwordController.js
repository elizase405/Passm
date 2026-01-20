const Password = require("../models/Password.js");
const { encrypt, decrypt } = require("../utils/crypto.js");

const getAllPasswords = async (req, res) => {
    try {
        const passwords = await Password.find({userId: req.userInfo.id});
        const decrypted = passwords.map((item) => ({
            ...item.toObject(),
            password: decrypt(item.password),
        }));
        res.status(200).json(decrypted);
    } catch (error) {
        console.log("Some error occured: ", error);
        res.status(500).json({ message: "Some error occured! Please try again" });
    }
}

const addPassword = async (req, res) => {
    const { site, username, password } = req.body;
    try {
        const encryptedPassword = encrypt(password);

        const newPassword = await Password.create({ site, username, password: encryptedPassword, userId: req.userInfo.id });

        if (newPassword) {
            res.status(201).json({ message: "Password saved successfully", id: newPassword._id });
        } else {
            res.status(400).json({ message: "Unable to save password! please try again." });
        }
    } catch (e) {
        console.log("Some error occured: ", e);
        res.status(500).json({ message: "Some error occured! Please try again" });
    }
}

const deletePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPassword = await Password.findOneAndDelete({ _id: id, userId: req.userInfo.id });

        if (deletedPassword) {
            res.status(200).json({ message: "Password deleted successfully" });
        } else {
            res.status(404).json({ message: "Password not found" });
        }
    } catch (err) {
        console.log("Some error occured: ", err);
        res.status(500).json({ message: "Some error occured! Please try again" });
    }
}

module.exports = { addPassword, deletePassword, getAllPasswords }