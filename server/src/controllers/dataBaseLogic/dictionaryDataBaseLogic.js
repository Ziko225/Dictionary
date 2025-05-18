const fs = require('fs');
class dictionaryDataBaseLogic {
    async readDB(email) {
        return await JSON.parse(fs.readFileSync(`./dataBase/${email}.json`));
    }

    async getData(email, type) {
        const fileContent = await this.readDB(email);

        return fileContent[type];
    };

    async add(email, type, data) {
        const result = {
            status: false,
            msg: ""
        };

        if (!data.name || !data.translate) {
            result.status = false;
            result.msg = "Please fill out all required fields";
            return result;
        }

        try {
            const db = await this.readDB(email);

            const name = data.name;

            if (db[type].filter((e) => e.name === name)[0]) {
                result.status = false;
                result.msg = `${name} already exist!`;
                console.info(`[${email}]: (!) Trying to add new word: ${name}`);
                return result;
            };

            const lastId = db[type][db[type].length - 1]?.id || 0;

            data.id = lastId + 1;

            db[type].push(data);

            console.info(`[${email}]: (!) Added new word: ${name}`);

            fs.writeFileSync(`./dataBase/${email}.json`, JSON.stringify(db));

            result.status = true;
            return result;
        } catch (error) {
            console.error(error);
        }
    };

    async toggleLearn(email, type, id) {
        const result = {
            status: true,
            msg: ""
        };

        if (!id) {
            result.status = false;
            result.msg = "Id required";
            return result;
        }

        try {
            const db = await this.readDB(email);

            const index = db[type].findIndex((e) => e.id === id);

            const selectedWord = db[type][index];

            if (index === -1) {
                result.status = false;
                result.msg = "id not found";
                return result;
            }

            selectedWord.learned = !selectedWord.learned;

            fs.writeFile(`./dataBase/${email}.json`, JSON.stringify(db), () => {
                console.info(
                    `[${email}]: (!) Toggled learned word: ${selectedWord.name} ${selectedWord.learned
                        ? "V"
                        : "X"}`
                );
            });

            return result;
        } catch (error) {
            console.error(error);
        }
    };

    async remove(email, type, id) {
        const result = {
            status: true,
            msg: ""
        };

        if (!id) {
            result.status = false;
            result.msg = "Id required";
            return result;
        }

        try {
            const db = await this.readDB(email);

            const index = db[type].findIndex((e) => e.id === id);
            if (index === -1) {
                result.status = false;
                result.msg = "id not found";
                return result;
            }

            const newData = [
                ...db[type].slice(0, index),
                ...db[type].slice(index + 1)
            ];

            const selectedWord = db[type][index]?.name;

            db[type] = newData;

            fs.writeFile(`./dataBase/${email}.json`, JSON.stringify(db), () => {
                console.info(`[${email}]: (!) Word: ${selectedWord} removed successful`);
            });

            return result;
        } catch (error) {
            console.error(error);
        }
    };
};

module.exports = new dictionaryDataBaseLogic();