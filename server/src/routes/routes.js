const Router = require('express');
const wordsRouter = require("./wordsRouter.js");
const verbsRouter = require("./verbsRouter.js");
const accountRouter = require("./accountRouter.js");

const authMiddleware = require('../middleware/authMiddleware.js');

const router = Router();

router.use("/settings", authMiddleware);
router.use("/dictionary/words", authMiddleware, wordsRouter);
router.use("/dictionary/verbs", authMiddleware, verbsRouter);
router.use("/account", accountRouter);

module.exports = router;