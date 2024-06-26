const express = require('express');
const router = express.Router();
const { 
    createUser, 
    loginUserCtrl,
    getallUser,
    getaUser,
    deleteaUser,
    updatedUser,
    handleRefreshToken,
    logoutUser
} = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.get("/all-users", getallUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logoutUser);
router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/:id", deleteaUser);
router.put("/edit-user", authMiddleware, updatedUser);

module.exports = router;