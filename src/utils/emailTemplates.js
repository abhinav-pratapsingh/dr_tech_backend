import { escapeHtml } from './escapeHtml.js';

export function buildContactMail(submission, to) {
    const title = 'New Contact Form Submission';
    const intro = 'A new contact enquiry has been submitted through the website.';

    return {
        to,
        replyTo: submission.email,
        subject: submission.subject || `New contact request from ${submission.name}`,
        text: [
            title,
            '',
            `Name: ${submission.name}`,
            `Phone: ${submission.phone || 'Not provided'}`,
            `Email: ${submission.email}`,
            `Subject: ${submission.subject || 'Not provided'}`,
            '',
            'Message:',
            submission.message
        ].join('\n'),
        html: buildEmailLayout({
            eyebrow: 'CONTACT ENQUIRY',
            title,
            intro,
            rows: [
                { label: 'Name', value: submission.name },
                { label: 'Phone', value: submission.phone || 'Not provided' },
                { label: 'Email', value: submission.email },
                { label: 'Subject', value: submission.subject || 'Not provided' }
            ],
            sections: [
                {
                    title: 'Message',
                    body: submission.message
                }
            ]
        })
    };
}

export function buildBookingMail(submission, to) {
    const title = 'New Booking Request';
    const intro = 'A new booking request has been submitted and is ready for review.';

    return {
        to,
        replyTo: submission.email,
        subject: `New booking request from ${submission.name}`,
        text: [
            title,
            '',
            `Name: ${submission.name}`,
            `Email: ${submission.email}`,
            `Phone: ${submission.phone}`,
            `Address: ${submission.address}`,
            `Postcode: ${submission.postcode || 'Not provided'}`,
            `Service Type: ${submission.service_type || 'Not provided'}`,
            `Site Type: ${submission.site_type || 'Not provided'}`,
            `Preferred Date: ${submission.preferred_date || 'Not provided'}`,
            `Preferred Time Slots: ${submission.time_slots.join(', ') || 'Not provided'}`,
            `Subscribe: ${submission.subscribe ? 'Yes' : 'No'}`,
            `Submitted At: ${submission.submitted_at || 'Not provided'}`,
            '',
            'Description:',
            submission.description,
            '',
            'Objectives:',
            submission.objectives || 'Not provided'
        ].join('\n'),
        html: buildEmailLayout({
            eyebrow: 'BOOKING REQUEST',
            title,
            intro,
            rows: [
                { label: 'Name', value: submission.name },
                { label: 'Email', value: submission.email },
                { label: 'Phone', value: submission.phone },
                { label: 'Address', value: submission.address },
                { label: 'Postcode', value: submission.postcode || 'Not provided' },
                { label: 'Service Type', value: submission.service_type || 'Not provided' },
                { label: 'Site Type', value: submission.site_type || 'Not provided' },
                { label: 'Preferred Date', value: submission.preferred_date || 'Not provided' },
                { label: 'Preferred Time Slots', value: submission.time_slots.join(', ') || 'Not provided' },
                { label: 'Newsletter', value: submission.subscribe ? 'Yes' : 'No' },
                { label: 'Submitted At', value: submission.submitted_at || 'Not provided' }
            ],
            sections: [
                {
                    title: 'Description of the Problem',
                    body: submission.description
                },
                {
                    title: 'Objectives',
                    body: submission.objectives || 'Not provided'
                }
            ]
        })
    };
}

function buildEmailLayout({ eyebrow, title, intro, rows, sections }) {
    const rowMarkup = rows
        .map(
            ({ label, value }) => `
                <tr class="detail-row">
                    <td class="detail-label" style="padding: 12px 16px; width: 180px; font-size: 13px; font-weight: 700; color: #6b7280; border-bottom: 1px solid #e5e7eb; vertical-align: top;">
                        ${escapeHtml(label)}
                    </td>
                    <td class="detail-value" style="padding: 12px 16px; font-size: 14px; color: #111827; border-bottom: 1px solid #e5e7eb; word-break: break-word;">
                        ${formatValue(value)}
                    </td>
                </tr>
            `
        )
        .join('');

    const sectionMarkup = sections
        .map(
            ({ title: sectionTitle, body }) => `
                <div class="email-section" style="margin-top: 24px;">
                    <div class="email-section-title" style="font-size: 13px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #e85d0c; margin-bottom: 10px;">
                        ${escapeHtml(sectionTitle)}
                    </div>
                    <div class="email-section-box" style="background: #fff7f1; border: 1px solid #f7d7c4; border-radius: 14px; padding: 16px 18px; font-size: 14px; line-height: 1.7; color: #1f2937; word-break: break-word;">
                        ${formatMultiline(body)}
                    </div>
                </div>
            `
        )
        .join('');

    return `
        <style>
            .email-shell {
                margin: 0;
                padding: 32px 16px;
                background: #f4f6fb;
                font-family: Arial, sans-serif;
                color: #111827;
            }

            .email-card {
                max-width: 720px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 24px;
                overflow: hidden;
                border: 1px solid #e5e7eb;
                box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
            }

            .email-header {
                padding: 28px 32px;
                background: linear-gradient(135deg, #111827 0%, #1f2937 100%);
            }

            .email-content {
                padding: 28px 32px 32px;
            }

            .email-table {
                width: 100%;
                border-collapse: collapse;
                border: 1px solid #e5e7eb;
                border-radius: 16px;
                overflow: hidden;
            }

            .email-card a {
                color: inherit;
                text-decoration: none;
            }

            @media only screen and (max-width: 600px) {
                .email-shell {
                    padding: 14px 8px !important;
                }

                .email-card {
                    border-radius: 18px !important;
                }

                .email-header {
                    padding: 22px 18px !important;
                }

                .email-content {
                    padding: 20px 16px 24px !important;
                }

                .email-title {
                    font-size: 24px !important;
                }

                .detail-label,
                .detail-value {
                    display: block !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                }

                .detail-label {
                    padding: 12px 14px 4px !important;
                    border-bottom: none !important;
                }

                .detail-value {
                    padding: 0 14px 14px !important;
                }

                .email-section {
                    margin-top: 18px !important;
                }

                .email-section-box {
                    padding: 14px !important;
                    border-radius: 12px !important;
                }
            }
        </style>
        <div class="email-shell" style="margin: 0; padding: 32px 16px; background: #f4f6fb; font-family: Arial, sans-serif; color: #111827;">
            <div class="email-card" style="max-width: 720px; margin: 0 auto; background: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);">
                <div class="email-header" style="padding: 28px 32px; background: linear-gradient(135deg, #111827 0%, #1f2937 100%);">
                    <div class="email-eyebrow" style="font-size: 12px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: #f8b48a; margin-bottom: 10px;">
                        ${escapeHtml(eyebrow)}
                    </div>
                    <div class="email-title" style="font-size: 30px; font-weight: 800; line-height: 1.2; color: #ffffff; margin-bottom: 10px;">
                        ${escapeHtml(title)}
                    </div>
                    <div class="email-intro" style="font-size: 14px; line-height: 1.7; color: rgba(255, 255, 255, 0.78);">
                        ${escapeHtml(intro)}
                    </div>
                </div>

                <div class="email-content" style="padding: 28px 32px 32px;">
                    <table class="email-table" role="presentation" style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden;">
                        ${rowMarkup}
                    </table>
                    ${sectionMarkup}
                </div>
            </div>
        </div>
    `;
}

function formatValue(value) {
    return escapeHtml(String(value || 'Not provided')).replace(/\n/g, '<br />');
}

function formatMultiline(value) {
    return escapeHtml(String(value || 'Not provided')).replace(/\n/g, '<br />');
}
