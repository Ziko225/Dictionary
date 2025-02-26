const dictionaryDataBaseLogic = require('./dataBaseLogic/dictionaryDataBaseLogic');
const clean = require('../util/cleanFunc');

const type = "verbs";
class VerbsController {

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
            const { name, v2, v3, translate, email } = req.body;
            if (!name || !v2 || !v3 || !translate) {
                return res.status(400).send();
            }

            const data = {
                id: 0,
                name: clean(name),
                v2: clean(v2),
                v3: clean(v3),
                translate: clean(translate),
                learned: false
            };

            const result = await dictionaryDataBaseLogic.add(email, type, data);

            if (!result.status) {
                return res.status(400).json(result.msg);
            }

            res.status(201).json(result.msg);

        } catch (error) {
            res.status(500).send();
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
            res.status(500).send();
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
            res.status(500).send();
        }
    };
};

module.exports = new VerbsController();