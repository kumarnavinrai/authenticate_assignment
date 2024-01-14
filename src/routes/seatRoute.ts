import express from 'express';
import { Request, Response } from 'express';
import { authenticateUser } from '../middleware/authenticateUser';
import * as seatValidation from '../validation/seatValidation';
import { validateRequest } from '../middleware/validateRequest';
import SeatController from '../controllers/seatController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Seats
 *   description: API endpoints for managing seats.
 */

/**
 * @swagger
 * /seat/seats:
 *   get:
 *     summary: Get all seats.
 *     tags: [Seats]
 *     responses:
 *       200:
 *         description: Returns a list of all seats.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/seats', authenticateUser, SeatController.getAllSeats);

/**
 * @swagger
 * /seat/seats/{id}:
 *   get:
 *     summary: Get a specific seat by ID.
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the seat.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns details of the specified seat.
 *       404:
 *         description: Seat not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/seats/:id', authenticateUser, SeatController.getSeatById);

/**
 * @swagger
 * /seat/seats:
 *   post:
 *     summary: Add a new seat.
 *     tags: [Seats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Seat'
 *     responses:
 *       201:
 *         description: Returns a success message.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal Server Error.
 */
router.post('/seats', seatValidation.validateSeatCreation, validateRequest, SeatController.addSeat);

/**
 * @swagger
 * /seat/seats/{id}:
 *   put:
 *     summary: Update an existing seat.
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the seat.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Seat'
 *     responses:
 *       200:
 *         description: Returns a success message.
 *       404:
 *         description: Seat not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/seats/:id', authenticateUser, seatValidation.validateSeatUpdate, validateRequest, SeatController.updateSeatById);

/**
 * @swagger
 * /seat/seats/{seat_number}/{route_id}:
 *   put:
 *     summary: Update an existing seat by seat number and route ID.
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: seat_number
 *         required: true
 *         description: Seat number of the seat.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: route_id
 *         required: true
 *         description: ID of the route.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Seat'
 *     responses:
 *       200:
 *         description: Returns a success message.
 *       404:
 *         description: Seat not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/seatupdate/:seat_number/:route_id', authenticateUser, seatValidation.validateSeatUpdate, validateRequest, SeatController.updateSeatBySeatNumber);


/**
 * @swagger
 * /seat/seats/route/{route_id}:
 *   get:
 *     summary: Get all seats for a specific route.
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         description: ID of the route.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns a list of all seats for the specified route.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/seats/route/:route_id', authenticateUser, SeatController.getSeatsByRouteId);

/**
 * @swagger
 * /seat/seats/open/{route_id}:
 *   get:
 *     summary: Get all open seats for a specific route.
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         description: ID of the route.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns a list of all open seats for the specified route.
 *       404:
 *         description: No open seats found for the specified route.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/seats/open/:route_id', authenticateUser, SeatController.getOpenSeatsByRouteId);

/**
 * @swagger
 * /seat/seats/closed/{route_id}:
 *   get:
 *     summary: Get all closed seats for a specific route.
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         description: ID of the route.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns a list of all closed seats for the specified route.
 *       404:
 *         description: No closed seats found for the specified route.
 *       500:
 *         description: Internal Server Error.
 */
router.get('/seats/closed/:route_id', authenticateUser, SeatController.getClosedSeatsByRouteId);

// In seatRoutes.ts

/**
 * @swagger
 * /seat/seats/open-all/{route_id}:
 *   put:
 *     summary: Open all seats for a specific route.
 *     tags: [Seats]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         description: ID of the route.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: All seats for the specified route have been opened.
 *       500:
 *         description: Internal Server Error.
 */
router.put('/seats/open-all/:route_id', authenticateUser, SeatController.openAllSeatsByRouteId);




export default router;
