const accountDataBaseLogic = require('./dataBaseLogic/accountDataBaseLogic');
const jwt = require('jsonwebtoken');
const constants = require('../constnts');
const { config } = require('dotenv');

config();

const jswAccessKey = process.env.JWT_KEY;
class AuthController {
    constructor() {
        this.login = this.login.bind(this);
        this.registration = this.registration.bind(this);
        this.authorizate = this.authorizate.bind(this);
    }

    async authorizate(res, email) {
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

            await this.authorizate(res, email);
            const userData = await accountDataBaseLogic.getAccountInfo(email);

            res.status(200).json(userData);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    };

    async registration(req, res) {
        try {
            const { password, email } = req.body;

            if (!password || !email || !constants.emailRegex.test(email)) {
                return res.status(400).send();
            }

            const status = await accountDataBaseLogic.createDB(email, password);

            if (status !== 201) {
                return res.status(status).send();
            }

            await this.authorizate(res, email);

            const userData = await accountDataBaseLogic.getAccountInfo(email);

            return res.status(status).json(userData);
        } catch (error) {
            console.error(error);
            return res.status(500).send();
        }
    }
}

module.exports = new AuthController();