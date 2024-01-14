import { body } from 'express-validator';

export const validateSeatCreation = [
  body('seat_number').isInt().withMessage('Seat number must be an integer'),
  body('status').isIn(['open', 'closed']).withMessage('Invalid seat status'),
  body('route_id').isInt().withMessage('Route ID must be an integer'),
  body('user_id').isInt().withMessage('User ID must be an integer'),
  body('user_details').optional().isString().withMessage('User details must be a string'),
];

export const validateSeatUpdate = [
  body('seat_number').isInt().withMessage('Seat number must be an integer'),
  body('route_id').isInt().withMessage('Route ID must be an integer'),
  body('user_id').isInt().withMessage('User ID must be an integer'),
];
