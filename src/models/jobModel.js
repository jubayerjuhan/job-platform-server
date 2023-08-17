import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  workingHours: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  appliedEmployees: [
    {
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
      },
      cvLink: String, // Add the CV link field
    }],
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer', // Replace with the actual model name for the employer
    required: true,
  },
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
