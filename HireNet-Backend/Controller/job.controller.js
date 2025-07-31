const Job = require("../models/job.model");

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      postedBy: req.user._id,
    });
    const saveJob = await job.save();
    res.status(201).json({
      message: "Job created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating job",
      error: err.message,
    });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.status(200).json({
      message: "jobs fetched successfully",
      jobs,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching jobs",
      error: err.message,
    });
  }
};



// Get a job by ID
exports.getmyjobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.status(200).json({
      message: "Job fetched successfully",
      job,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching job",
      error: err.message,
    });
  }
};

exports.applyjob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.user.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    const alreadyApplied = job.applicants.some(
      (app) => app.user.toString() === userId
    );
    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    job.applicants.push({ user: userId });
    await job.save();
    res.status(200).json({
      message: "Applied for job successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error applying for job",
      error: err.message,
    });
  }
};
