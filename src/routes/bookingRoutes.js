import { Router } from 'express';
import { submitBooking } from '../controllers/bookingController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.post('/bookings', asyncHandler(submitBooking));

export default router;