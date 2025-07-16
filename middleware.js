import jwt from "jsonwebtoken";
import { config } from './config.js';

export function middleware(req, res, next) {
    const token = req.query.token || req.headers['authorization']?.split(' ')[1];
    // console.log('token: ', token);

    if (!token) return res.status(401).send('Missing token');

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        // Optional: check claims like allowed filename, userId, etc.
        // req.user = decoded;
        next();
    } catch (err) {
        console.log('jwt failed', err);
        return res.status(403).send('Invalid or expired token');
    }
}
