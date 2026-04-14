import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port: Number(process.env.PORT || 4000),
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
    smtpHost: process.env.SMTP_HOST || '',
    smtpPort: Number(process.env.SMTP_PORT || 587),
    smtpSecure: process.env.SMTP_SECURE === 'true',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    mailFrom: process.env.MAIL_FROM || process.env.SMTP_USER || '',
    contactToEmail: process.env.CONTACT_TO_EMAIL || '',
    bookingToEmail: process.env.BOOKING_TO_EMAIL || process.env.CONTACT_TO_EMAIL || ''
};