import * as BookController from '../controllers/bookController.js';
import express from 'express';

const bookRoutes = express.Router();

bookRoutes.get('/all', BookController.fetchBooks);

export default bookRoutes;