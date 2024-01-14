// src/app.ts
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import allRoutes from './routes';
import UserModel from './models/userModel';
import SeatModel from './models/seatModel';
import BusModel from './models/busModel';
import BusRouteModel from './models/busRouteModel';


import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Define Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Authenticate Assignment',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes
};

// Initialize Swagger
const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Sync models with the database
UserModel.sync();
SeatModel.sync();
BusModel.sync();
BusRouteModel.sync();

// Routes
app.use(allRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
