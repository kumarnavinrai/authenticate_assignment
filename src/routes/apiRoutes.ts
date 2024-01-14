// src/routes/apiRoutes.ts

import express from 'express';
import { Request, Response, NextFunction } from 'express';
import UserController from '../controllers/userController';
import * as userValidation from '../validation/userValidation';
import { validateRequest } from '../middleware/validateRequest';
import { authenticateUser } from '../middleware/authenticateUser';
import { validationResult } from 'express-validator';
const SECRET_KEY = process.env.SECRET_KEY || '';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *         email:
 *           type: string
 *           description: The user's email.
 *         name:
 *           type: string
 *           description: The user's name.
 *         password:
 *           type: string
 *           description: The user's password.
 *         token:
 *           type: string
 *           description: The user's authentication token.
 *         created:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp.
 *         updated:
 *           type: string
 *           format: date-time
 *           description: The update timestamp.
 */

/**
 * @swagger
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *
 * /api/users:
 *   get:
 *     summary: Get all users.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the list of users.
 */



router.get('/users', authenticateUser, UserController.getAllUsers);


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the user by ID.
 *       404:
 *         description: User not found.
 */
router.get('/users/:id', authenticateUser, userValidation.validateUserId, validateRequest, UserController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Add a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Returns the newly created user.
 *       400:
 *         description: Bad request.
 */
router.post('/users', userValidation.validateUserCreation, validateRequest, UserController.addUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the authentication token.
 *       401:
 *         description: Invalid email or password.
 */
router.post('/login', userValidation.validateUserLogin, validateRequest, UserController.loginUser);



export default router;
