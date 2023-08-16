import catchAsyncError from "../utils/catchAsyncError.js"
import Employee from "../models/employeeModel.js"
import bcrypt from "bcryptjs"


// Creating a user with create function
export const createEmployee = catchAsyncError(async (req, res, next) => {

  const employee = await Employee.create(req.body);

  // sending success response
  res.status(200).json({
    success: true,
    message: "User Creation Successful!",
    employee
  });
});


// Login a user with create function
export const loginEmployee = catchAsyncError(async (req, res, next) => {

  const { email, password } = req.body;

  try {
    const employee = await Employee.findOne({ email });


    if (!employee) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, employee.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({success: true, employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


// Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching employees' });
  }
};

// Upload employee
export const uploadEmployee = async (req, res) => {
  try {
    const newEmployeeData = req.body;
    const newEmployee = new Employee(newEmployeeData);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ error: 'Error uploading employee' });
  }
};

// Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (deletedEmployee) {
      res.status(200).json(deletedEmployee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting employee' });
  }
};