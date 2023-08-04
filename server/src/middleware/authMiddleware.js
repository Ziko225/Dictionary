const jwt = require('jsonwebtoken');
const jswAccessKey = process.env.JWT_KEY;

const authMiddleware = async (req, res, next) => {

    try {
        const { token } = req.cookies;

        if (!token) {
            res.status(403).json("Forbidden");
            return;
        }

        const status = await jwt.verify(token, jswAccessKey);

        if (!status) {
            req.status(403).json("Forbidden");
            return;
        }

        next();
    } catch (error) {
        res.status(403).json("Forbidden");
    }
};

module.exports = authMiddleware;