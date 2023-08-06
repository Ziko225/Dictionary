const dbLogic = require('./dbLogic');
const clean = require('../util/cleanFunc');

const key = "verbs";
class VerbsController {

    async get(req, res) {
        const result = await dbLogic.getData(key);
        res.status(200).json(result);
    }

    async create(req, res) {
        try {
            const { name, v2, v3, translate } = req.body;
            if (!v2 || !v3) {
                return res.status(400).json("v2 and v3 required");
            }

            const data = {
                id: 0,
                name: clean(name),
                v2: clean(v2),
                v3: clean(v3),
                translate: clean(translate),
                learned: false
            };

            const result = await dbLogic.add(key, data);

            if (!result.status) {
                return res.status(400).json(result.msg);
            }

            res.status(200).json(result);

        } catch (e) {
            res.status(500).json(e);
        }
    };

    async toggle(req, res) {
        try {
            const { id } = req.body;

            const result = await dbLogic.toggleLearn(key, +id);

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

            const result = await dbLogic.remove(key, +id);

            if (!result.status) {
                return res.status(400).json(result.msg);
            }

            res.status(200).send();
        } catch (error) {
            res.status(500).send(error);
        }
    };
};

module.exports = new VerbsController();