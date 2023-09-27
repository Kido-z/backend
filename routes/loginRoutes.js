const express = require('express');
const router = express.Router();
const { createUser, loginUserCtrl,} = require('../controllers/userController');

router.post("/register", createUser);
router.post("/login", loginUserCtrl);

module.exports = router;