const express = require("express");
const { register, login, getAuthenticatedUser, logOut } = require("../controllers/authControllers.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getAuthenticatedUser);
router.post("/logout", logOut);

module.exports = router;