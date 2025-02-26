const fs = require('fs');

class accountDataBaseLogic {
    async readDB(email) {
        return await JSON.parse(fs.readFileSync(`./dataBase/${email}.json`));
    }

    async createDB(email, password) {
        try {
            const fileContent = await this.readDB(email);

            if (fileContent) {
                return false;
            }

            return false;
        } catch (error) {
            fs.writeFileSync(`./dataBase/${email}.json`, JSON.stringify(
                {
                    account: {
                        email: email,
                        password: password,
                        nickname: 'User'
                    },
                    words: [],
                    verbs: []
                }
            ));

            console.log(`(!) ### created new DataBase ${email}.json ###`);
            return true;
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
                nickname: account.nickname,
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    }
};

module.exports = new accountDataBaseLogic();