const express = require('express');
const router = express.Router();
const verifytoken = require('../middleware/auth.middleware');
const {getContacts,getMessages} = require('../Controller/chat.controller');

router.get('/contacts', verifytoken, getContacts);
router.get('/messages/:id', verifytoken, getMessages);



module.exports = router;