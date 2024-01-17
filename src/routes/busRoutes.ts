import express from 'express';
import { Request, Response, NextFunction } from 'express';
import UserController from '../controllers/userController';
import BusController from '../controllers/busController';
import * as userValidation from '../validation/userValidation';
import * as busValidation from '../validation/busValidation';
import { validateRequest } from '../middleware/validateRequest';
import { authenticateUser } from '../middleware/authenticateUser';
import { validationResult } from 'express-validator';
const SECRET_KEY = process.env.SECRET_KEY || '';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Buses
 *   description: API endpoints for managing buses.
 */

/**
 * @swagger
 * /bus/buses:
 *   get:
 *     summary: Get all buses.
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: Returns a list of all buses.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/buses', authenticateUser, BusController.getAllBuses);

/**
 * @swagger
 * /bus/buses/{id}:
 *   get:
 *     summary: Get a specific bus by ID.
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the bus.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns details of the specified bus.
 *       404:
 *         description: Bus not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/buses/:id', authenticateUser, BusController.getBusById);

/**
 * @swagger
 * /bus/buses:
 *   post:
 *     summary: Add a new bus.
 *     tags: [Buses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       200:
 *         description: Returns a success message.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/buses', busValidation.validateBusCreation, validateRequest, BusController.addBus);

/**
 * @swagger
 * /bus/buses/{id}:
 *   put:
 *     summary: Update an existing bus.
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the bus.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       200:
 *         description: Returns a success message.
 *       404:
 *         description: Bus not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/buses/:id', authenticateUser, busValidation.validateBusUpdate, validateRequest, BusController.updateBus);

/**
 * @swagger
 * /bus/buses/{id}:
 *   delete:
 *     summary: Delete a bus by ID.
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the bus.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns a success message.
 *       404:
 *         description: Bus not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete('/buses/:id', authenticateUser, BusController.deleteBus);




export default router;
