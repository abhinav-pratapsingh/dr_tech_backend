export function notFoundHandler(req, res) {
    res.status(404).json({
        ok: false,
        error: `Route not found: ${req.method} ${req.originalUrl}`
    });
}

export function errorHandler(error, _req, res, _next) {
    res.status(500).json({
        ok: false,
        error: error?.message || 'Internal server error.'
    });
}