import Job from "../models/jobModel.js";

// Create a new job
const createJob = async (req, res) => {
  try {
    const newJob = await Job.create({ ...req.body });
    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all jobs
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("employer");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("employer");
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a job by ID
const updateJobById = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedJob) {
      res.json(updatedJob);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a job by ID
const deleteJobById = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (deletedJob) {
      res.json({ message: 'Job deleted' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createJob,
  getAllJobs,
  getJobById,
  updateJobById,
  deleteJobById,
};
