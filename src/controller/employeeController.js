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