const { addPassword, deletePassword, getAllPasswords } = require('../controllers/passwordController');
const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');

const router = express.Router();
router.use(authMiddleware);

router.post('/save-password', addPassword);
router.get('/get-passwords', getAllPasswords);
router.delete('/delete-password/:id', deletePassword);

module.exports = router;