// BusController.ts

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import BusModel from '../models/busModel';

class BusController {
  public static getAllBuses(req: Request, res: Response): void {
    BusModel.findAll()
      .then((buses) => {
        res.json(buses);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }

  public static getBusById(req: Request, res: Response): void {
    const { id } = req.params;

    BusModel.findByPk(id)
      .then((bus) => {
        if (!bus) {
          res.status(404).json({ error: 'Bus not found' });
        } else {
          res.json(bus);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }

  public static addBus(req: Request, res: Response): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
  
    const newBus = req.body;
  
    // Check if a bus with the same bus_no already exists
    BusModel.findOne({
      where: {
        bus_no: newBus.bus_no,
      },
    })
      .then((existingBus) => {
        if (existingBus) {
          // Bus with the same bus_no already exists, return an error response
          res.status(400).json({ error: 'Bus with the same bus number already exists' });
        } else {
          // If no existing bus, add the new bus
          BusModel.create(newBus)
            .then(() => {
              res.json({ message: 'Bus added successfully' });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json({ error: 'Internal Server Error' });
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }
  

  public static updateBus(req: Request, res: Response): void {
    const { id } = req.params;
    const updatedBus = req.body;

    BusModel.findByPk(id)
      .then((bus) => {
        if (!bus) {
          res.status(404).json({ error: 'Bus not found' });
        } else {
          return bus.update(updatedBus);
        }
      })
      .then(() => {
        res.json({ message: 'Bus updated successfully' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }

  public static deleteBus(req: Request, res: Response): void {
    const { id } = req.params;

    BusModel.findByPk(id)
      .then((bus) => {
        if (!bus) {
          res.status(404).json({ error: 'Bus not found' });
        } else {
          return bus.destroy();
        }
      })
      .then(() => {
        res.json({ message: 'Bus deleted successfully' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  }
}

export default BusController;
