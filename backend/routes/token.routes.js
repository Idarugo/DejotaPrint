const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/token.controller");

router.post("/generate", tokenController.generateToken);
router.get("/verify/:token", tokenController.verifyToken);
router.post("/invalidate/:token", tokenController.invalidateToken);

module.exports = router;
