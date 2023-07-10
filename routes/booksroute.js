import express from 'express';
import getAllBooks, { checkAvailability } from '../controllers/booksController.js'
const router = express.Router();

router.get('/getAllBooks', getAllBooks);
router.get('/:id/availability', checkAvailability)
export default router;