import express from 'express';
import { validationResult } from 'express-validator';

export function validateRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
  
    return res.status(400).json({ errors: errors.array() });
  }