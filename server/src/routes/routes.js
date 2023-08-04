const Router = require('express');
const wordsRouter = require("./wordsRouter.js");
const authRouter = require("./authRouter.js");

const authMiddleware = require('../middleware/authMiddleware.js');

const router = Router();

router.use("/words", authMiddleware, wordsRouter);
router.use("/auth", authRouter);

module.exports = router;