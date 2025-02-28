const Router = require('express');
const authController = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const AccountController = require('../controllers/AccountController.js');

const router = Router();

router.post("/login", authController.login);
router.post("/registration", authController.registration);

router.get("/getinfo", authMiddleware, AccountController.getInfo);
router.get("/logout", authMiddleware, AccountController.logOut);

router.put('/settings', authMiddleware, AccountController.settings)

module.exports = router;