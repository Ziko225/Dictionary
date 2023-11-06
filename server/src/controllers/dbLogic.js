const fs = require('fs');

class DBLogic {

    async readDB() {
        return await JSON.parse(fs.readFileSync('./db.json'));
    }

    async getData(dbTitle) {
        try {
            const fileContent = await this.readDB();
            return fileContent[dbTitle];
        } catch (error) {
            fs.writeFileSync("./db.json", JSON.stringify(
                {
                    words: [],
                    verbs: []
                }
            ));
            console.log("(!) ### created new DataBase ###");

            const fileContent = await this.readDB();
            return fileContent[dbTitle];
        }
    };

    async add(dbTitle, data) {
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
            const db = await this.readDB();

            const name = data.name;

            if (db[dbTitle].filter((e) => e.name === name)[0]) {
                result.status = false;
                result.msg = `${name} already exist!`;
                console.log(`(!) Trying to add new word: ${name}`);
                return result;
            };

            const lastId = db[dbTitle][db[dbTitle].length - 1]?.id || 0;

            data.id = lastId + 1;

            db[dbTitle].push(data);

            console.log(`(!) Added new word: ${name}`);

            fs.writeFileSync("./db.json", JSON.stringify(db));

            result.status = true;
            return result;
        } catch (error) {
            console.error(error);
        }
    };

    async toggleLearn(dbTitle, id) {
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
            const db = await this.readDB();

            const index = db[dbTitle].findIndex((e) => e.id === id);

            const selectedWord = db[dbTitle][index];

            if (index === -1) {
                result.status = false;
                result.msg = "id not found";
                return result;
            }

            selectedWord.learned = !selectedWord.learned;

            fs.writeFile("./db.json", JSON.stringify(db), () => {
                console.log(
                    `(!) Toggled learned word: ${selectedWord.name} ${selectedWord.learned
                        ? "V"
                        : "X"}`
                );
            });

            return result;
        } catch (error) {
            console.error(error);
        }
    };

    async remove(dbTitle, id) {
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
            const db = await this.readDB();

            const index = db[dbTitle].findIndex((e) => e.id === id);
            if (index === -1) {
                result.status = false;
                result.msg = "id not found";
                return result;
            }

            const newData = [
                ...db[dbTitle].slice(0, index),
                ...db[dbTitle].slice(index + 1)
            ];

            const selectedWord = db[dbTitle][index]?.name;

            db[dbTitle] = newData;

            fs.writeFile("./db.json", JSON.stringify(db), () => {
                console.log(`(!) Word: ${selectedWord} removed successful`);
            });

            return result;
        } catch (error) {
            console.error(error);
        }
    };
};

module.exports = new DBLogic();