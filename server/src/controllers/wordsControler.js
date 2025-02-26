const dictionaryDataBaseLogic = require('./dataBaseLogic/dictionaryDataBaseLogic');
const clean = require('../util/cleanFunc');
const type = "words";

class WordsController {
    async get(req, res) {
        try {
            const { email } = req.body;

            const result = await dictionaryDataBaseLogic.getData(email, type);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).send();
        }
    }

    async create(req, res) {
        try {
            const { name, translate, email } = req.body;

            const data = {
                id: 0,
                name: clean(name),
                translate: clean(translate),
                learned: false
            };

            const result = await dictionaryDataBaseLogic.add(email, type, data);

            if (!result.status) {
                return res.status(400).json(result.msg);
            }

            res.status(201).json(result.msg);

        } catch (error) {
            res.status(500).json(error);
        }
    };

    async toggle(req, res) {
        try {
            const { id, email } = req.body;

            const result = await dictionaryDataBaseLogic.toggleLearn(email, type, +id);

            if (!result.status) {
                return res.status(400).json(result.msg);
            }

            res.status(200).send();
        } catch (error) {
            res.status(500).json(error.message);
        }
    };

    async remove(req, res) {
        try {
            const { id } = req.params;
            const { email } = req.body;

            const result = await dictionaryDataBaseLogic.remove(email, type, +id);

            if (!result.status) {
                return res.status(400).json(result.msg);
            }

            res.status(200).send();
        } catch (error) {
            res.status(500).send(error);
        }
    };
};

module.exports = new WordsController();