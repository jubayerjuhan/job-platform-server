import express from 'express';
import { createEmployer, deleteEmployerById, getAllEmployers, getEmployerById, updateEmployerById } from '../controller/employerController.js';

const router = express.Router();

// Create a new employer
router.post('/employers', createEmployer);

// Get all employers
router.get('/employers', getAllEmployers);

// Get a single employer by ID
router.get('/employers/:id', getEmployerById);

// Update an employer by ID
router.put('/employers/:id', updateEmployerById);

// Delete an employer by ID
router.delete('/employers/:id', deleteEmployerById);

export default router;
