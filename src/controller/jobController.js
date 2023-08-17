import Employee from "../models/employeeModel.js";
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


// Controller to get jobs posted by a specific employer based on provided employerId
export const getJobsByEmployerId = async (req, res) => {
  try {

    const jobs = await Job.find({ employer: req.params.id }).populate('employer', 'name');

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error: error.message });
  }
};


export const applyToJob = async (req, res) => {
  try {
    const { jobId, employeeId, cvLink } = req.body;


    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found, Maybe You Are a Employer and Trying To Apply To A Job' });
    }

    // Add the employee's ID and CV link to the job's appliedEmployees array
    if (!job.appliedEmployees) {
      job.appliedEmployees = []
    }
    job.appliedEmployees.push({ employee: employeeId, cvLink });
    await job.save();

    return res.status(200).json({ message: 'Applied to job successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



export const getAppliedEmployees = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const job = await Job.findById(jobId).populate({ path: 'appliedEmployees.employee', options: { strictPopulate: false } });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const appliedEmployees = job.appliedEmployees.map(applied => {
      return {
        employee: applied.employee,
        cvLink: applied.cvLink,
      };
    });

    return res.status(200).json({ appliedEmployees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};



export {
  createJob,
  getAllJobs,
  getJobById,
  updateJobById,
  deleteJobById,

};
