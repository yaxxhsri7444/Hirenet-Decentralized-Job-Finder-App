const Job = require("../models/job.model");
const User = require("../models/user.model");
const Application = require("../models/application.model"); // if using

const getDashboardStats = async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalApplications = await Application.countDocuments(); // optional: if you're tracking job applications

    res.status(200).json({
      totalJobs,
      totalUsers,
      totalApplications,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      message: "Error fetching dashboard data",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
