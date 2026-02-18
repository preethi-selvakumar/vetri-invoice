const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Extract the token from the header
    const token = req.header('x-auth-token');

    // If the token is missing, access is denied
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store the decoded value as an object to access it as 'req.user.id' in the controller
        req.user = decoded;

        next(); // Grant permission to the controller
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;