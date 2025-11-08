import * as StudentController from '../controllers/studentController.js';
import express from 'express';

const studentRoutes = express.Router();

studentRoutes.get('/all', StudentController.fetchStudents);

export default studentRoutes;