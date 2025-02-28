const Router = require('express');
const wordsController = require('../controllers/verbsController.js');

const router = Router();

router.get("/", wordsController.get);
router.post("/", wordsController.create);
router.put("/", wordsController.toggle);
router.delete("/", wordsController.remove);

module.exports = router;