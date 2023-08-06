const fs = require('fs');

class DBLogic {

    async getData(dbTitle) {
        try {
            const fileContent = await JSON.parse(fs.readFileSync('./db.json'));
            return fileContent[dbTitle];
        } catch (error) {
            fs.writeFileSync("./db.json", JSON.stringify(
                {
                    words: [],
                    verbs: []
                }
            ));
            console.log("(!) ### created new DataBase ###");

            const fileContent = await JSON.parse(fs.readFileSync('./db.json'));
            return fileContent[dbTitle];
        }
    };

    async add(dbTitle, data) {
        const result = {
            status: true,
            msg: ""
        };

        if (!data.name || !data.translate) {
            result.status = false;
            result.msg = "Please fill out all required fields";
            return result;
        }

        try {
            const db = await fs.readFileSync('./db.json');
            const parsedData = JSON.parse(db);

            const name = data.name;

            if (parsedData[dbTitle].filter((e) => e.name === name)[0]) {
                result.status = false;
                result.msg = `${name} already exist!`;
                console.log(`(!) Trying to add new word: ${name}`);
                return result;
            };

            const lastId = parsedData[dbTitle][parsedData[dbTitle].length - 1]?.id || 0;

            data.id = lastId + 1;

            parsedData[dbTitle].push(data);

            console.log(`(!) Added new word: ${name}`);

            fs.writeFileSync("./db.json", JSON.stringify(parsedData));

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
            const data = await fs.readFileSync('./db.json');
            const parsedData = JSON.parse(data);

            const index = parsedData[dbTitle].findIndex((e) => e.id === id);

            const selectedWord = parsedData[dbTitle][index];

            if (index === -1) {
                result.status = false;
                result.msg = "id not found";
                return result;
            }

            selectedWord.learned = !selectedWord.learned;

            fs.writeFile("./db.json", JSON.stringify(parsedData), () => {
                console.log(
                    `(!) Toggled learned word: ${selectedWord.name} ${selectedWord.learned
                        ? "✓"
                        : "X"}`
                );
            });

            return result;
        } catch (error) {
            console.error(error);
        }
    };

    async remove(dbTitle, id) {
        const data = await fs.readFileSync('./db.json');

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
            const parsedData = JSON.parse(data);

            const index = parsedData[dbTitle].findIndex((e) => e.id === id);
            if (index === -1) {
                result.status = false;
                result.msg = "id not found";
                return result;
            }

            const newData = [
                ...parsedData[dbTitle].slice(0, index),
                ...parsedData[dbTitle].slice(index + 1)
            ];

            const selectedWord = parsedData[dbTitle][index]?.name;

            parsedData[dbTitle] = newData;

            fs.writeFile("./db.json", JSON.stringify(parsedData), () => {
                console.log(`(!) Word: ${selectedWord} removed successful`);
            });

            return result;
        } catch (error) {
            console.error(error);
        }
    };
};

module.exports = new DBLogic();