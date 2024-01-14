import { body } from 'express-validator';

export const validateBusRouteCreation = [
  body('routeStart').notEmpty().withMessage('Route start is required'),
  body('routeEnd').notEmpty().withMessage('Route end is required'),
  body('when').notEmpty().withMessage('When is required'),
  body('timeStart').notEmpty().withMessage('Time start is required'),
  body('timeEnd').notEmpty().withMessage('Time end is required'),
  body('busId').notEmpty().withMessage('Bus ID is required'),
  body('routeName').notEmpty().withMessage('Route name is required'),
  body('status').notEmpty().withMessage('Status is required'),
];

export const validateBusRouteUpdate = [
  body('routeStart').optional(),
  body('routeSnd').optional(),
  body('when').optional(),
  body('timeStart').optional(),
  body('timeEnd').optional(),
  body('busId').optional(),
  body('routeName').optional(),
  body('status').optional(),
];
