const express = require('express');
const router = express.Router();
const authmiddleware = require('../Middleware/auth.middleware');
const {createChat,sendmessage ,getUserchats} = require('../Controller/chat.controller');
const authMiddleware = require('../Middleware/auth.middleware');

router.post('/start',authMiddleware ,createChat);
router.post('/message/:id',authMiddleware ,sendmessage);
router.get('/my',authMiddleware ,getUserchats);


module.exports = router;