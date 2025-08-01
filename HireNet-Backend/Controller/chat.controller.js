const Message = require("../models/message.model");
const User = require("../models/user.model");

exports.getMessages = async (req, res) => {
  try {
    const myId = req.user.id;
    const friendId = req.params.id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: friendId },
        { senderId: friendId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error: error.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const myId = req.user.id;
    const messages = await Message.find({ $or: [{ senderId: myId }, { receiverId: myId }] });

    const userIds = new Set();

    messages.forEach((msg) => {
      if (msg.senderId.toString() !== myId) userIds.add(msg.senderId.toString());
      if (msg.receiverId.toString() !== myId) userIds.add(msg.receiverId.toString());
    });

    const users = await User.find({ _id: { $in: Array.from(userIds) } }).select("name _id");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { jobId, senderId, receiverId, message } = req.body;

    const newMessage = new Message({ jobId, senderId, receiverId, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
};

