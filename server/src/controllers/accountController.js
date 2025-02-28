const { config } = require('dotenv');
const accountDataBaseLogic = require('./dataBaseLogic/accountDataBaseLogic');
const constants = require('../constnts');
const authController = require('./authController');

config();

class AccountController {
    async getInfo(req, res) {
        try {
            const { email } = req.body;

            const data = await accountDataBaseLogic.getAccountInfo(email);

            res.status(200).json(data);
        } catch (error) {
            res.status(500).send();
        }
    }

    async logOut(req, res) {
        try {
            res.clearCookie("token");
            res.end();
        } catch (error) {
            res.status(500).send();
        }
    }

    async settings(req, res) {
        try {
            const { username, email, newEmail, language, password } = req.body;

            const newData = {
                username,
                email,
                newEmail,
                language,
                password
            };

            if (newEmail && !constants.emailRegex.test(newEmail)) {
                return res.status(400).json('email');
            }

            const status = await accountDataBaseLogic.changeAccountData(newData);

            if (status !== 200) {
                return res.status(status).send();
            }

            if (newEmail) {
                await authController.authorizate(res, newEmail);
            }

            const dataBase = await accountDataBaseLogic.getAccountInfo(newEmail || email);
            res.status(200).json(dataBase);

        } catch (error) {
            console.error(error);
            res.status(500).send();
        }
    }
}

module.exports = new AccountController();