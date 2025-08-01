const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true },
    role: { type: String, enum: ["jobseeker", "employer","recruiter"], default: "jobseeker" },
    skills: { type: [String], default: [] },
    experience: { type: Number, default: 0 },   
    education: { type: String, default: "" },
    location: { type: String, default: "" },
    phone: { type: String, default: "" },
    resume: { type: String, default: "" },
    trustScore: { type: Number, default: 0 },
    profilePicture: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
