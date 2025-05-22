const { config } = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/routes');
const fs = require('fs');

const https = require('https');
const http = require('http');

config();

const PORT = process.env.PORT || 3001;
const protocol = process.env.PROTOCOL || 'http';

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(cookieParser());

app.use(router);

app.listen = function () {
    console.info(`Start ${protocol} server on port: ${PORT}`);

    if (protocol === 'https') {
        const options = {
            key: fs.readFileSync('./credentials/privateKey.key', 'utf8'),
            cert: fs.readFileSync('./credentials/certificate.crt', 'utf8'),
        };

        return https.createServer(options, app).listen(PORT);
    };

    return http.createServer(app).listen(PORT);
};

app.listen();
