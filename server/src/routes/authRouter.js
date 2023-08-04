const Router = require('express');
const authController = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const router = Router();

router.post("/", authController.login);
router.get("/", authMiddleware, authController.check);

module.exports = router;