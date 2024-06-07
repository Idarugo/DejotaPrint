const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authenticateToken = require("../middleware/authenticateToken");

// Ruta para el inicio de sesión
router.post("/login", authController.login);

// Ruta para el registro de un nuevo usuario
router.post("/register", authController.register);

// Ruta para cerrar sesión
router.post("/logout", authController.logout);

// Ruta para restablecer la contraseña
router.post("/reset-password", authController.resetPassword);

// Ruta para verificar el token de restablecimiento de contraseña
router.get("/verify-reset-token/:token", authController.verifyResetToken);

// Ruta protegida que solo puede ser accedida con un token válido
router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Este es un recurso protegido", user: req.user });
});

module.exports = router;
