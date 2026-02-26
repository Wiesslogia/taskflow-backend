import { body } from 'express-validator';

export const registerValidator = [
  body('name').notEmpty().withMessage('Name is required'),

  body('email')
    .isEmail()
    .withMessage('Valid email required'),

  body('password')
    .isStrongPassword({
      minLength: 6,
      minUppercase: 1,
      minNumbers: 1
    })
    .withMessage('Password must be strong')
];

export const loginValidator = [
  body('email').isEmail(),
  body('password').notEmpty()
];