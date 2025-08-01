const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    senderId:{type: mongoose.Schema.Types.ObjectId, ref: "User",required: true},
    receiverId:{type: mongoose.Schema.Types.ObjectId, ref: "User",required:true},
    text:{type: String, required: true},
},{ timestamps: true , default: Date.now() });

module.exports = mongoose.model("Message", messageSchema);
