import { env } from '../config/env.js';
import { getMailer } from '../config/mailer.js';

export async function sendMail(options) {
    if (!env.smtpHost || !env.smtpUser || !env.smtpPass || !env.mailFrom) {
        throw new Error('SMTP configuration is incomplete.');
    }

    const transporter = getMailer();
    return transporter.sendMail({
        from: env.mailFrom,
        ...options
    });
}