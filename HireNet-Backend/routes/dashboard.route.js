const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../Controller/dashboard.controller.js");

router.get("/stats", getDashboardStats);

module.exports = router;
