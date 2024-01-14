import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel';
const SECRET_KEY = process.env.SECRET_KEY || '';


// Middleware to check if the user is authenticated
export async function authenticateUser(req: Request, res: Response, next: NextFunction) {
    try {
      // Extract the token from the Authorization header
      const token = req.headers.authorization?.split(' ')[1];
  
      // Check if the token is provided
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Token is missing' });
      }
  
      // Verify the token
      jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] }, async (err, decoded: any) => {
          if (err) {
            console.error('Token verification error:', err);
          } else {
            console.log('Token decoded:', decoded);
          }
  
        if (err) {
          return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
      
        // Fetch the user from the database based on the decoded information
        const user = await UserModel.findOne({ where: { id: decoded?.userId } });
        
  
        // Check if the user exists and the token matches the stored token
        if (!user || user.token !== token) {
          return res.status(401).json({ error: 'Unauthorized: Token mismatch' });
        }
  
        // Check if the token is not older than 2 hours
        const tokenTimestamp = new Date(decoded.iat * 1000); // iat is the timestamp when the token was issued
        const currentTimestamp = new Date();
        const twoHoursAgo = new Date(currentTimestamp.getTime() - 2 * 60 * 60 * 1000);
  
        if (tokenTimestamp < twoHoursAgo) {
          return res.status(401).json({ error: 'Unauthorized: Token has expired' });
        }
  
        // Store decoded user information in the request for further use (if needed)
        res.locals.user = decoded;
  
        // User is authenticated, proceed to the next middleware or route handler
        return next();
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }