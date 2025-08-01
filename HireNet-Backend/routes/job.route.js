const express = require('express');
const router = express.Router();
const jobController = require('../Controller/job.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/create', authMiddleware, jobController.createJob);
router.get('/all', jobController.getAllJobs);
router.get('/job/:id',jobController.getmyjobs);
router.post('/apply/:jobId', authMiddleware, jobController.applyjob);

module.exports = router;