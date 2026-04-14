import { env } from '../config/env.js';
import { sendMail } from '../utils/sendMail.js';
import { buildContactMail } from '../utils/emailTemplates.js';
import { createContactSubmission } from '../models/contactModel.js';

export async function submitContact(req, res) {
    const submission = createContactSubmission(req.body);

    if (!submission.name || !submission.email || !submission.message) {
        return res.status(400).json({
            ok: false,
            error: 'Name, email, and message are required.'
        });
    }

    if (!env.contactToEmail) {
        return res.status(500).json({
            ok: false,
            error: 'Contact recipient email is not configured.'
        });
    }

    const mail = buildContactMail(submission, env.contactToEmail);
    const info = await sendMail(mail);

    return res.status(200).json({
        ok: true,
        id: info.messageId || null,
        message: 'Email sent successfully.'
    });
}