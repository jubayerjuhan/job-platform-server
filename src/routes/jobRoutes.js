import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJobById,
  deleteJobById,
  getJobsByEmployerId,
} from '../controller/jobController.js'; // Update the path accordingly

const router = express.Router();

// Create a new job
router.post('/jobs', createJob);

// Get all jobs
router.get('/jobs', getAllJobs);
router.get('/myjobs/:id', getJobsByEmployerId);

// Get a single job by ID
router.get('/jobs/:id', getJobById);

// Update a job by ID
router.put('/jobs/:id', updateJobById);

// Delete a job by ID
router.delete('/jobs/:id', deleteJobById);

export default router;
