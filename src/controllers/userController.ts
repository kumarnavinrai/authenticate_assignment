// src/controllers/userController.ts

import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY || '';

class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const allUsers = await UserModel.findAll();
      res.json(allUsers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const user = await UserModel.findByPk(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async addUser(req: Request, res: Response) {
    const newUser = req.body;
    try {
      await UserModel.create(newUser);
      res.json({ message: 'User added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '2h' });

      // Save the token in the database
      await user.update({ token });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UserController;
