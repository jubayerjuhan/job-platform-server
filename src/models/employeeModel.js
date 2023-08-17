import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const employeeSchema = new mongoose.Schema({
  photo: {
    type: String,
    required: [false, 'Photo is required']
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  industry: {
    type: String,
    required: [true, 'Industry is required']
  },
  skills: {
    type: String,
    required: [true, 'Skills are required']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  role: {
    type: String,
    default: "employee"
  },
  appliedEmployees: [
    {
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
      cvLink: String, // Add the CV link field
    }],
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

// Hash the password before saving
employeeSchema.pre('save', async function (next) {
  const employee = this;

  if (employee.isModified('password') || employee.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(employee.password, salt);
      employee.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
