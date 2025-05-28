const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, updateProfile } = require('../Controller/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile',authMiddleware, getProfile);
router.put('/updateprofile',authMiddleware, updateProfile);

module.exports = router;

