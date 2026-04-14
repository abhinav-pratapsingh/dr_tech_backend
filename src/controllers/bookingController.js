import { env } from '../config/env.js';
import { sendMail } from '../utils/sendMail.js';
import { buildBookingMail } from '../utils/emailTemplates.js';
import { createBookingSubmission } from '../models/bookingModel.js';

export async function submitBooking(req, res) {
    const submission = createBookingSubmission(req.body);

    if (!submission.name || !submission.email || !submission.phone || !submission.address || !submission.description) {
        return res.status(400).json({
            ok: false,
            error: 'Name, email, phone, address, and description are required.'
        });
    }

    if (!submission.time_slots.length) {
        return res.status(400).json({
            ok: false,
            error: 'At least one preferred time slot is required.'
        });
    }

    if (!env.bookingToEmail) {
        return res.status(500).json({
            ok: false,
            error: 'Booking recipient email is not configured.'
        });
    }

    const mail = buildBookingMail(submission, env.bookingToEmail);
    const info = await sendMail(mail);

    return res.status(200).json({
        ok: true,
        id: info.messageId || null,
        message: 'Booking submitted successfully.'
    });
}