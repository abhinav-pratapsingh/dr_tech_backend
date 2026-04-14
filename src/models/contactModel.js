export function createContactSubmission(payload = {}) {
    return {
        name: String(payload.name || '').trim(),
        phone: String(payload.phone || '').trim(),
        email: String(payload.email || '').trim(),
        subject: String(payload.subject || '').trim(),
        message: String(payload.message || '').trim()
    };
}