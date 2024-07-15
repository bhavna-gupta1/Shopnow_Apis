const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleware = (req, res, next) => {
    // Check if Authorization header exists and extract token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify token using JWT_SECRET from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user information to request object
        next(); // Call next middleware or route handler
    } catch (err) {
        console.error('JWT Verification Error:', err);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
// geneate token
const generateToken = (userdata) => {
    try {
        return jwt.sign(userdata, process.env.JWT_SECRET);
    } catch (err) {
        throw new Error('Failed to generate token');
    }
};
module.exports = {jwtAuthMiddleware,generateToken};
