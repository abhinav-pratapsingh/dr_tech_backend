export function createBookingSubmission(payload = {}) {
    return {
        name: String(payload.name || '').trim(),
        email: String(payload.email || '').trim(),
        phone: String(payload.phone || '').trim(),
        address: String(payload.address || '').trim(),
        postcode: String(payload.postcode || '').trim(),
        description: String(payload.description || '').trim(),
        objectives: String(payload.objectives || '').trim(),
        service_type: String(payload.service_type || '').trim(),
        site_type: String(payload.site_type || '').trim(),
        preferred_date: String(payload.preferred_date || '').trim(),
        time_slots: Array.isArray(payload.time_slots)
            ? payload.time_slots.map((slot) => String(slot).trim()).filter(Boolean)
            : [],
        subscribe: Boolean(payload.subscribe),
        submitted_at: String(payload.submitted_at || '').trim()
    };
}