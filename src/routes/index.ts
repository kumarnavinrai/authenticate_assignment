import express from 'express';
import apiRoutes from './apiRoutes';
import busRoutes from './busRoutes';
import busRouteRouter from './busRouteRouter';
import seatRouter from './seatRoute';

const router = express.Router();

router.use('/api', apiRoutes);
router.use('/bus', busRoutes);
router.use('/busroute', busRouteRouter);
router.use('/seats', seatRouter);

export default router;
