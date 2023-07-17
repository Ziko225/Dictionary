const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
const cors = require("cors");

config();
const authMiddleware = require('./middleware/authMiddleware');

const jswAccessKey = process.env.JWT_KEY;
const passwordKey = process.env.PASSWORD_KEY;
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());

app.get("/", authMiddleware, (reqsuest, response) => {
    const fileContent = JSON.parse(fs.readFileSync('./db.json'));
    response.status(200).json(fileContent);
});

app.post("/auth", (req, res) => {
    try {
        const { password } = req.body;

        if (!password || password !== passwordKey) {
            res.status(400).send();
            return;
        }

        const token = jwt.sign({}, jswAccessKey, { expiresIn: "60d" });

        res.cookie("token", token, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true }).send();
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put("/", authMiddleware, (reqsuest, response) => {
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
            try {
                const json = JSON.parse(data);

                if (!json.words) {
                    fs.writeFile("./db.json", JSON.stringify(
                        {
                            words: [{
                                id: 1,
                                name: name.toLowerCase(),
                                translate: translate.toLowerCase(),
                                learned: false
                            }]
                        }
                    ), () => {
                        console.log("created new db files");
                    });

                    return response.status(200).send();
                }

                const words = json.words;

                if (words.filter((e) => e.name === name)[0]) {
                    response.status(400).send("This name already exist");
                    console.log(name, "exist <!>");
                    return;
                };

                const id = words[0] ? words[words.length - 1].id : 1;

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

                response.status(200).send();
            } catch (error) {

                response.status(500).send(error.message);
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/:id", authMiddleware, (req, res) => {
    try {
        res.json(req.params.id);
        const { id } = req.params;

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
});

app.delete("/:id", authMiddleware, (req, res) => {
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
});

app.listen(PORT, () => console.log("Server started on port", PORT));
