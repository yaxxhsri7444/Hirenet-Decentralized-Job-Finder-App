const Chat = require('../models/chat.model');

exports.createChat = async (req, res) =>{
    const { receiverId } = req.body;
    const senderId = req.user._id;
    
    try{
        let chat = await Chat.findOne({
            participant: { $all: [senderId, receiverId] },
        });
        if(!chat){
            chat = await Chat.create({
                participant: [senderId, receiverId],
            });
        }
        return res.status(200).json({ message: 'Chat created successfully', chat });
    }catch(err){
        console.error(err);
        return res.status(500).json({meassage:'Chat creation failed', error: err.message});
    }
};

exports.sendmessage = async (req, res) => {
    const { chatId, text } = req.body;
    const senderId = req.user._id;

    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        const newMessage = {
            sender: senderId,
            text,
            timestamp: new Date(),
        };
        chat.messages.push(newMessage);
        await chat.save();
        return res.status(200).json({ message: 'Message sent successfully', chat });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Message sending failed', error: err.message });
    }
};

exports.getUserchats = async (req, res) => {
    const userId = req.user._id;

    try {
        const chats = await Chat.find({
            participant: userId,
        }).populate('participant', 'name email').populate('messages.sender', 'name email');
        return res.status(200).json({ message: 'Chats retrieved successfully', chats });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to retrieve chats', error: err.message });
    }
};