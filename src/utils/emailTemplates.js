import { escapeHtml } from './escapeHtml.js';

export function buildContactMail(submission, to) {
    return {
        to,
        replyTo: submission.email,
        subject: submission.subject || `New contact request from ${submission.name}`,
        text: [
            `Name: ${submission.name}`,
            `Phone: ${submission.phone || 'Not provided'}`,
            `Email: ${submission.email}`,
            `Subject: ${submission.subject || 'Not provided'}`,
            '',
            'Message:',
            submission.message
        ].join('\n'),
        html: `
            <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.6;">
                <h2 style="margin-bottom: 16px;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(submission.phone || 'Not provided')}</p>
                <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
                <p><strong>Subject:</strong> ${escapeHtml(submission.subject || 'Not provided')}</p>
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(submission.message).replace(/\n/g, '<br />')}</p>
            </div>
        `
    };
}

export function buildBookingMail(submission, to) {
    return {
        to,
        replyTo: submission.email,
        subject: `New booking request from ${submission.name}`,
        text: [
            'New Booking Request',
            '',
            `Name: ${submission.name}`,
            `Email: ${submission.email}`,
            `Phone: ${submission.phone}`,
            `Address: ${submission.address}`,
            `Postcode: ${submission.postcode || 'Not provided'}`,
            `Description: ${submission.description}`,
            `Objectives: ${submission.objectives || 'Not provided'}`,
            `Service Type: ${submission.service_type || 'Not provided'}`,
            `Site Type: ${submission.site_type || 'Not provided'}`,
            `Preferred Date: ${submission.preferred_date || 'Not provided'}`,
            `Preferred Time Slots: ${submission.time_slots.join(', ')}`,
            `Subscribe: ${submission.subscribe ? 'Yes' : 'No'}`,
            `Submitted At: ${submission.submitted_at || 'Not provided'}`
        ].join('\n'),
        html: `
            <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.6;">
                <h2 style="margin-bottom: 16px;">New Booking Request</h2>
                <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
                <p><strong>Phone:</strong> ${escapeHtml(submission.phone)}</p>
                <p><strong>Address:</strong> ${escapeHtml(submission.address)}</p>
                <p><strong>Postcode:</strong> ${escapeHtml(submission.postcode || 'Not provided')}</p>
                <p><strong>Description:</strong><br />${escapeHtml(submission.description).replace(/\n/g, '<br />')}</p>
                <p><strong>Objectives:</strong><br />${escapeHtml(submission.objectives || 'Not provided').replace(/\n/g, '<br />')}</p>
                <p><strong>Service Type:</strong> ${escapeHtml(submission.service_type || 'Not provided')}</p>
                <p><strong>Site Type:</strong> ${escapeHtml(submission.site_type || 'Not provided')}</p>
                <p><strong>Preferred Date:</strong> ${escapeHtml(submission.preferred_date || 'Not provided')}</p>
                <p><strong>Preferred Time Slots:</strong> ${escapeHtml(submission.time_slots.join(', '))}</p>
                <p><strong>Newsletter Subscribe:</strong> ${submission.subscribe ? 'Yes' : 'No'}</p>
                <p><strong>Submitted At:</strong> ${escapeHtml(submission.submitted_at || 'Not provided')}</p>
            </div>
        `
    };
}