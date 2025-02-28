const fs = require('fs');

const dataBasePath = './dataBase';

class accountDataBaseLogic {
    async readDB(email) {
        return await JSON.parse(fs.readFileSync(`${dataBasePath}/${email}.json`));
    }

    async checkIsEmailExist(email) {
        try {
            const dataBasesList = await fs.readdirSync(dataBasePath);

            return !!dataBasesList.find((dataBase) => dataBase === `${email}.json`);
        } catch (error) {
            fs.mkdirSync(dataBasePath);
            return false;
        }
    }

    async createDB(email, password) {
        try {
            const isEmailExist = await this.checkIsEmailExist(email);

            if (isEmailExist) {
                return 409;
            }

            fs.writeFileSync(`${dataBasePath}/${email}.json`, JSON.stringify(
                {
                    account: {
                        email: email,
                        username: 'User',
                        language: 'en-US',
                        password: password,
                    },
                    words: [],
                    verbs: []
                }
            ));

            console.log(`(!) ### created new DataBase ${email}.json ###`);
            return 201;
        } catch (error) {
            console.error(error);
            return 500;
        }
    }

    async checkPassword(email, password) {
        try {
            const data = await this.readDB(email);

            if (data.account.email === email && data.account.password === password) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            return false;
        }
    }

    async getAccountInfo(email) {
        try {
            const { account } = await this.readDB(email);

            return {
                email: account.email,
                username: account.username,
                language: account.language,
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async changeAccountData(params) {
        try {
            const {
                username,
                email,
                newEmail,
                language,
                password
            } = params;

            const dataBase = await this.readDB(email);

            const currentDataBasePath = `${dataBasePath}/${newEmail || email}.json`;

            if (newEmail) {
                const dataBasesList = await fs.readdirSync(dataBasePath);

                const isEmailExist = !!dataBasesList.find((email) => email === `${newEmail}.json`);

                if (isEmailExist) {
                    return 409;
                }

                await fs.renameSync(`${dataBasePath}/${email}.json`, currentDataBasePath);
            }

            const newAccountData = {
                ...dataBase.account,
                username: username || dataBase.account.username,
                language: language || dataBase.account.language,
                password: password || dataBase.account.password,
                email: newEmail || dataBase.account.email,
            };

            const newData = {
                ...dataBase,
                account: newAccountData
            };

            await fs.writeFileSync(currentDataBasePath, JSON.stringify(newData));

            return 200;
        } catch (error) {
            console.error(error);
            return 500;
        }
    }
};

module.exports = new accountDataBaseLogic();