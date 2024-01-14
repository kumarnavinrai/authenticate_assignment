// busRouteController.ts

import { Request, Response } from 'express';
import BusRouteModel from '../models/busRouteModel';
import SeatModel from '../models/seatModel';
import sequelize from '../config/database'; // Assuming you have a sequelize instance set up



class BusRouteController {
  // Get all bus routes
  static async getAllBusRoutes(req: Request, res: Response) {
    try {
      const busRoutes = await BusRouteModel.findAll();
      res.json(busRoutes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Get bus route by ID
  static async getBusRouteById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const busRoute = await BusRouteModel.findByPk(id);

      if (busRoute) {
        res.json(busRoute);
      } else {
        res.status(404).json({ error: 'Bus route not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


static async addBusRoute(req: Request, res: Response) {
  const newBusRoute = req.body;

  // Check if a route with the same details already exists
  const existingRoute = await BusRouteModel.findOne({
    where: {
      busId: newBusRoute.busId,
      routeStart: newBusRoute.routeStart,
      routeEnd: newBusRoute.routeEnd,
      timeStart: newBusRoute.timeStart,
      timeEnd: newBusRoute.timeEnd,
    },
  });

  if (existingRoute) {
    // Route already exists, return an error response
    return res.status(400).json({ error: 'Route already exists for the specified details' });
  }

  // Create a transaction to ensure atomicity
  const t = await sequelize.transaction();

  try {
    // If no existing route, add the new route
    const createdBusRoute = await BusRouteModel.create(newBusRoute, { transaction: t });

    // Check if seats already exist for the route
    const existingSeats = await SeatModel.findOne({
      where: {
        route_id: createdBusRoute.id,
      },
    });

    if (!existingSeats) {
      // Create seats for the route (assuming 40 seats per route)
      const seats = Array.from({ length: 40 }, (_, index) => ({
        seat_number: index + 1,
        bus_no: newBusRoute.busId.toString(),
        route_id: createdBusRoute.id,
        status: 'open',
      }));

      await SeatModel.bulkCreate(seats, { transaction: t });
    }

    // Commit the transaction
    await t.commit();

    res.status(201).json(createdBusRoute);
  } catch (error) {
    // Rollback the transaction in case of an error
    await t.rollback();

    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



  // Update bus route by ID
  static async updateBusRouteById(req: Request, res: Response) {
    const { id } = req.params;
    const updatedBusRoute = req.body;

    try {
      const busRoute = await BusRouteModel.findByPk(id);

      if (busRoute) {
        await busRoute.update(updatedBusRoute);
        res.json(busRoute);
      } else {
        res.status(404).json({ error: 'Bus route not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Delete bus route by ID
  static async deleteBusRouteById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const busRoute = await BusRouteModel.findByPk(id);

      if (busRoute) {
        await busRoute.destroy();
        res.json({ message: 'Bus route deleted successfully' });
      } else {
        res.status(404).json({ error: 'Bus route not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default BusRouteController;
