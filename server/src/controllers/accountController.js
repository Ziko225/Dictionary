const { config } = require('dotenv');
const accountDataBaseLogic = require('./dataBaseLogic/accountDataBaseLogic');
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
}

module.exports = new AccountController();