export function getHealth(req,res) {
    res.status(200).json({
        ok: true,
        service: 'tech-dr-backend'
    });
}