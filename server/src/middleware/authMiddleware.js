const jwt = require('jsonwebtoken');
const jswAccessKey = process.env.JWT_KEY;

const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            res.status(401).json("Unauthorized");
            return;
        }

        const status = await jwt.verify(token, jswAccessKey);

        if (!status) {
            req.status(401).json("Unauthorized");
            return;
        }

        next();
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = authMiddleware;