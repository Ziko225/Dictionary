const Router = require('express');
const wordsController = require('../controllers/wordsControler.js');

const router = Router();

router.get("/", wordsController.getAll);
router.post("/", wordsController.create);
router.put("/", wordsController.toggle);
router.delete("/:id", wordsController.remove);

module.exports = router;