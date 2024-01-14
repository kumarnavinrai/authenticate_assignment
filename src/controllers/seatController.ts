import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import SeatModel from '../models/seatModel';

class SeatController {
    // Get all seats
    static async getAllSeats(req: Request, res: Response): Promise<void> {
        try {
            const seats = await SeatModel.findAll();
            res.json(seats);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Get seat by ID
    static async getSeatById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const seat = await SeatModel.findByPk(id);
            if (seat) {
                res.json(seat);
            } else {
                res.status(404).json({ error: 'Seat not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Add a new seat
    static async addSeat(req: Request, res: Response): Promise<void> {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const newSeat = req.body;
        const { seat_number, user_id, route_id } = newSeat;

        try {
            // Check if the seat_number is within the valid range (1 to 40)
            if (seat_number < 1 || seat_number > 40) {
                res.status(400).json({ error: 'Seat number must be between 1 and 40' });
                return;
            }

            // Check if the user has already booked a seat for the specified route
            const existingSeat = await SeatModel.findOne({
                where: { user_id, route_id },
            });

            if (existingSeat) {
                res.status(400).json({ error: 'User has already booked a seat for this route' });
                return;
            }

            // If the user has not booked a seat for this route and seat_number is valid, proceed with adding the seat
            const createdSeat = await SeatModel.create(newSeat);
            res.status(201).json(createdSeat);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Update seat by ID
    static async updateSeatById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const updatedSeat = req.body;

        try {
            const seat = await SeatModel.findByPk(id);

            if (seat) {
                await seat.update(updatedSeat);
                res.json({ message: 'Seat updated successfully' });
            } else {
                res.status(404).json({ error: 'Seat not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    static async updateSeatBySeatNumber(req: Request, res: Response): Promise<void> {
        const { seat_number, route_id } = req.params;
        const { user_id, status, user_details } = req.body;

        try {
            const seat = await SeatModel.findOne({
                where: { seat_number, route_id },
            });

            if (seat) {
                // Update user_id, status, user_details
                seat.user_id = user_id;
                seat.status = status;
                seat.user_details = user_details;

                // Save the updated seat
                await seat.save();

                res.json({ message: 'Seat updated successfully' });
            } else {
                res.status(404).json({ error: 'Seat not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    // Get all seats for a specific route by route_id
    static async getSeatsByRouteId(req: Request, res: Response): Promise<void> {
        const { route_id } = req.params;

        try {
            const seats = await SeatModel.findAll({
                where: { route_id },
            });

            res.json(seats);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Get all open seats for a specific route by route_id
    static async getOpenSeatsByRouteId(req: Request, res: Response): Promise<void> {
        const { route_id } = req.params;

        try {
            const openSeats = await SeatModel.findAll({
                where: { route_id, status: 'open' },
            });

            res.json(openSeats);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Get all closed seats for a specific route by route_id
    static async getClosedSeatsByRouteId(req: Request, res: Response): Promise<void> {
        const { route_id } = req.params;

        try {
            const closedSeats = await SeatModel.findAll({
                where: { route_id, status: 'close' },
            });

            res.json(closedSeats);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Delete seat by ID
    static async deleteSeatById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const seat = await SeatModel.findByPk(id);

            if (seat) {
                await seat.destroy();
                res.json({ message: 'Seat deleted successfully' });
            } else {
                res.status(404).json({ error: 'Seat not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Open all seats for a specific route
    static async openAllSeatsByRouteId(req: Request, res: Response): Promise<void> {
        const { route_id } = req.params;

        try {
            // Find all seats for the specified route and update their status to 'open'
            const seats = await SeatModel.update(
                { status: 'open' },
                { where: { route_id } }
            );

            res.json({ message: 'All seats for the route have been opened' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

export default SeatController;
