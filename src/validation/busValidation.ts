// busValidation.ts

import { body } from 'express-validator';

export const validateBusCreation = [
  body('bus_no').notEmpty().withMessage('Bus number is required'),
  // Add more validations as needed
];

export const validateBusUpdate = [
  body('bus_no').notEmpty().withMessage('Bus number is required'),
  // Add more validations as needed
];
