import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import contactRoutes from './contactRoutes.js';
import bookingRoutes from './bookingRoutes.js';

const router = Router();

router.use(healthRoutes);
router.use(contactRoutes);
router.use(bookingRoutes);

export default router;