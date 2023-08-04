const fs = require('fs');

class WordsController {

    async getAll(reqsuest, response) {
        try {
            const fileContent = await JSON.parse(fs.readFileSync('./db.json'));
            response.status(200).json(fileContent);
        } catch (error) {
            fs.writeFile("./db.json", JSON.stringify(
                {
                    words: []
                }
            ), () => {
                console.log("### created new DataBase ###");
                const fileContent = JSON.parse(fs.readFileSync('./db.json'));
                response.status(200).json(fileContent);
            });
        }
    };

    create(reqsuest, response) {
        try {
            const { name, translate } = reqsuest.body;
            if (!name || typeof (name) !== "string") {
                response.status(400).send();
                return;
            }

            if (!translate || typeof (translate) !== "string") {
                response.status(400).send();
                return;
            }

            fs.readFile('./db.json', function (err, data) {
                const json = JSON.parse(data);

                const words = json.words;

                if (words.filter((e) => e.name === name)[0]) {
                    response.status(400).send("This name already exist");
                    console.log(name, "exist <!>");
                    return;
                };

                const id = words[0] ? words[words.length - 1].id : 0;

                words.push(
                    {
                        id: id + 1,
                        name: name.toLowerCase(),
                        translate: translate.toLowerCase(),
                        learned: false
                    }
                );

                fs.writeFile("./db.json", JSON.stringify({ words }), () => {
                    console.log(`added new word: ${name}`);
                });

                response.status(201).send();
            });

        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    toggle(req, res) {
        try {
            const { id } = req.body;

            fs.readFile('./db.json', function (err, data) {
                const words = JSON.parse(data).words;

                const index = words.findIndex((e) => e.id === +id);
                if (index === -1) {
                    return;
                }

                words[index].learned = !words[index].learned;

                fs.writeFile("./db.json", JSON.stringify({ words }), () => {
                    console.log(`toggle learned word with id: ${id}`);
                });
            });

            res.status(200).send();
        } catch (error) {
            res.status(500).send(error.message);
        }
    };

    remove(req, res) {
        try {
            res.json(req.params.id);
            const { id } = req.params;

            fs.readFile('./db.json', function (err, data) {
                const words = JSON.parse(data).words;

                const index = words.findIndex((e) => e.id === +id);
                if (index === -1) {
                    return;
                }

                const newWords = [
                    ...words.slice(0, index),
                    ...words.slice(index + 1)
                ];

                fs.writeFile("./db.json", JSON.stringify({ words: newWords }), () => {
                    console.log(`removed word with id: ${id}`);
                });
            });

            res.status(200).send();
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
};

module.exports = new WordsController();