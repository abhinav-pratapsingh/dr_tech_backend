import { Router } from 'express';
import { submitBooking } from '../controllers/bookingController.js';

const router = Router();

router.post('/bookings', submitBooking);

export default router;