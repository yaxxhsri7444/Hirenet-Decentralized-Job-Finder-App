const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  requirements: { type: [String] },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
  },
  industry: { type: String },
  craeatedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  applicants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      appliedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
module.exports = mongoose.model("Job", jobSchema);
