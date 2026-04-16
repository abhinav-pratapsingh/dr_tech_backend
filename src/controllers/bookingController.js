import { env } from '../config/env.js';
import { sendMail } from '../utils/sendMail.js';
import { buildBookingMail } from '../utils/emailTemplates.js';

export async function submitBooking(req, res) {
    try {
        const submission = {
            name: String(req.body?.name || '').trim(),
            email: String(req.body?.email || '').trim(),
            phone: String(req.body?.phone || '').trim(),
            address: String(req.body?.address || '').trim(),
            postcode: String(req.body?.postcode || '').trim(),
            description: String(req.body?.description || '').trim(),
            objectives: String(req.body?.objectives || '').trim(),
            service_type: String(req.body?.service_type || '').trim(),
            site_type: String(req.body?.site_type || '').trim(),
            preferred_date: String(req.body?.preferred_date || '').trim(),
            time_slots: Array.isArray(req.body?.time_slots)
                ? req.body.time_slots
                    .map((slot) => formatBookingTimeSlot(String(slot).trim()))
                    .filter(Boolean)
                : [],
            subscribe: Boolean(req.body?.subscribe),
            submitted_at: formatSubmittedAt(req.body?.submitted_at)
        };

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
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: error?.message || 'Failed to submit booking.'
        });
    }
}

function formatBookingTimeSlot(slot) {
    const slotLabels = {
        morning: 'Morning (8:00 AM - 11:30 AM)',
        midday: 'Midday (12:00 PM - 2:30 PM)',
        afternoon: 'Afternoon (3:00 PM - 5:30 PM)',
        evening: 'Evening (6:00 PM - 9:00 PM)'
    };

    return slotLabels[slot] || slot;
}

function formatSubmittedAt(value) {
    const rawValue = String(value || '').trim();

    if (!rawValue) {
        return '';
    }

    const date = new Date(rawValue);

    if (Number.isNaN(date.getTime())) {
        return rawValue;
    }

    return date.toLocaleString('en-AU', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}
