const { config } = require('dotenv');
config();

const jwt = require('jsonwebtoken');
const jswAccessKey = process.env.JWT_KEY;
const passwordKey = process.env.PASSWORD_KEY;

class AuthController {

    login(req, res) {
        try {
            const { password } = req.body;
            if (!password || password !== passwordKey) {
                res.status(400).send();
                return;
            }

            const token = jwt.sign({}, jswAccessKey, { expiresIn: "60d" });

            res.cookie("token", token, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.status(200).send();
        } catch (error) {
            res.status(500).send(error);
        }
    };

    check(req, res) {
        res.status(200).json("OK");
    }
}

module.exports = new AuthController();