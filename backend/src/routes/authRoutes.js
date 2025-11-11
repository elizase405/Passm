const express = require("express");
const authMiddleware = require("../middleware/authMiddleware.js");
const { register, login } = require("../controllers/authControllers.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;