import verify from "jsonwebtoken";

export function middleware(req, res, next) {
    const token = req.query.token || req.headers['authorization']?.split(' ')[1];
    // if (!token) return res.status(401).send('Missing token');

    try {
        // const decoded = verify(token, process.env.JWT_SECRET);
        // Optional: check claims like allowed filename, userId, etc.
        // req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).send('Invalid or expired token');
    }
}
