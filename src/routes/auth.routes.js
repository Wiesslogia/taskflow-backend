import express from 'express';
import { body } from 'express-validator';
import { validate } from '../middlewares/auth.middleware.js';
import { register, login } from '../controllers/auth.controller.js';
import{ registerValidator, loginValidator } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/register', 
    
    registerValidator,
    validate, 
    register
);

router.post('/login', 
    loginValidator,
    validate, 
    login
);

export default router;