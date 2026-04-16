import { env } from '../config/env.js';
import { sendMail } from '../utils/sendMail.js';
import { buildContactMail } from '../utils/emailTemplates.js';

export async function submitContact(req, res) {
    try {
        const submission = {
            name: String(req.body?.name || '').trim(),
            phone: String(req.body?.phone || '').trim(),
            email: String(req.body?.email || '').trim(),
            subject: String(req.body?.subject || '').trim(),
            message: String(req.body?.message || '').trim()
        };

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
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: error?.message || 'Failed to send email.'
        });
    }
}
