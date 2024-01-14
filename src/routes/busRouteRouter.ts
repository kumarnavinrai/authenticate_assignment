import express from 'express';
import BusRouteController from '../controllers/busRouteController';
import * as busRouteValidation from '../validation/busRouteValidation';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

/**
 * @swagger
 * securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 */

/**
 * @swagger
 * /busroute/busroutes:
 *   get:
 *     summary: Get all bus routes.
 *     tags: [BusRoutes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the list of bus routes.
 */

router.get('/busroutes', BusRouteController.getAllBusRoutes);


/**
 * @swagger
 * /busroute/busroutes/{id}:
 *   get:
 *     summary: Get a specific bus route by ID.
 *     tags: [BusRoutes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the bus route.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns the details of the bus route.
 *       404:
 *         description: Bus route not found.
 */

router.get('/busroutes/:id', BusRouteController.getBusRouteById);


/**
 * @swagger
 * /busroute/busroutes:
 *   post:
 *     summary: Add a new bus route.
 *     tags: [BusRoutes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BusRoute'
 *     responses:
 *       201:
 *         description: Returns the newly created bus route.
 *       400:
 *         description: Bad request.
 */


router.post('/busroutes', busRouteValidation.validateBusRouteCreation, validateRequest, BusRouteController.addBusRoute);

export default router;
