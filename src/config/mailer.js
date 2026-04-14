import nodemailer from 'nodemailer';
import { env } from './env.js';

let transporter;

export function getMailer() {
    if (transporter) {
        return transporter;
    }

    transporter = nodemailer.createTransport({
        host: env.smtpHost,
        port: env.smtpPort,
        secure: env.smtpSecure,
        auth: {
            user: env.smtpUser,
            pass: env.smtpPass
        }
    });

    return transporter;
}