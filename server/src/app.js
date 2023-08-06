const { config } = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const router = require('./routes/routes');

config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());

app.use(router);

app.listen(PORT, () => console.log("Server started on port", PORT));
