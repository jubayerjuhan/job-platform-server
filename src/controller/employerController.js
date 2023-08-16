import Employer from "../models/employerModel.js";

// Create a new employer
export const createEmployer = async (req, res) => {
  try {
    const newEmployer = await Employer.create(req.body);
    res.status(201).json(newEmployer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the employer by email
    const employer = await Employer.findOne({ email });

    // If employer not found or password doesn't match, return error
    if (!employer || !(await employer.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Return the logged-in employer's information
    res.status(200).json(employer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

// Get all employers
export const getAllEmployers = async (req, res) => {
  try {
    const employers = await Employer.find();
    res.json(employers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single employer by ID
export const getEmployerById = async (req, res) => {
  try {
    const employer = await Employer.findById(req.params.id);
    if (employer) {
      res.json(employer);
    } else {
      res.status(404).json({ message: 'Employer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an employer by ID
export const updateEmployerById = async (req, res) => {
  try {
    const updatedEmployer = await Employer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedEmployer) {
      res.json(updatedEmployer);
    } else {
      res.status(404).json({ message: 'Employer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an employer by ID
export const deleteEmployerById = async (req, res) => {
  try {
    const deletedEmployer = await Employer.findByIdAndDelete(req.params.id);
    if (deletedEmployer) {
      res.json({ message: 'Employer deleted' });
    } else {
      res.status(404).json({ message: 'Employer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

