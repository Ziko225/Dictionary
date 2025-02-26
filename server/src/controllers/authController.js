const { config } = require('dotenv');
config();

const accountDataBaseLogic = require('./dataBaseLogic/accountDataBaseLogic');
const jwt = require('jsonwebtoken');

const jswAccessKey = process.env.JWT_KEY;

class AuthController {
    constructor() {
        this.login = this.login.bind(this);
        this.registration = this.registration.bind(this);
        this.authorizate = this.authorizate.bind(this);
    }

    async authorizate(req, res) {
        const { email } = req.body;

        const token = jwt.sign({ email }, jswAccessKey, { expiresIn: "320d" });

        res.cookie("token", token, {
            maxAge: 320 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            priority: 'high',
            path: '/'
        });

        return true;
    }

    async login(req, res) {
        try {
            const { password, email } = req.body;

            if (!password || !email) {
                return res.status(400).send();
            }

            const isSuccess = await accountDataBaseLogic.checkPassword(email, password);

            if (!isSuccess) {
                return res.status(400).send();
            }

            await this.authorizate(req, res);

            res.status(200).send();
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    };

    async registration(req, res) {
        try {
            const { password, email } = req.body;

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!password || !email || !emailRegex.test(email)) {
                return res.status(400).send();
            }

            const isSuccess = await accountDataBaseLogic.createDB(email, password);

            if (isSuccess) {
                await this.authorizate(req, res);
                return res.status(201).send();
            } else {
                return res.status(409).send();
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send();
        }
    }
}

module.exports = new AuthController();