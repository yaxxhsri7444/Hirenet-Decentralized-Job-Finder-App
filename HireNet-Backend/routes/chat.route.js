const express = require('express');
const router = express.Router();
const verifytoken = require('../middleware/auth.middleware');
const {getContacts,getMessages,sendMessage} = require('../Controller/chat.controller');

router.get('/contacts', verifytoken, getContacts);
router.get('/messages/:id', verifytoken, getMessages);
router.post('/send', verifytoken, sendMessage);



module.exports = router;