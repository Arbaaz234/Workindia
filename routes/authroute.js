import express from 'express';
import { login } from './../controllers/authcontroller.js';
import signUp from './../controllers/authcontroller.js';
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
export default router;