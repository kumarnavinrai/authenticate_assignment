// validation/userValidation.ts

import { body, param } from 'express-validator';

export const validateUserId = param('id').isInt().withMessage('Invalid user ID');

export const validateUserCreation = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('name').notEmpty().withMessage('Name is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const validateUserLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
];