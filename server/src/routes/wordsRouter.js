const Router = require('express');
const wordsController = require('../controllers/wordsControler.js');

const router = Router();

router.get("/", wordsController.get);
router.post("/", wordsController.create);
router.put("/", wordsController.toggle);
router.delete("/", wordsController.remove);

module.exports = router;