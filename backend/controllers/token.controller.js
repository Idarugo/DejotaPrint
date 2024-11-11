const tokenModel = require("../models/token.model");
const { v4: uuidv4 } = require("uuid");

async function generateToken(req, res) {
  const token = uuidv4(); // Genera un token único
  try {
    await tokenModel.createToken(req.pool, token);
    res.json({ token });
  } catch (error) {
    console.error("Error al generar el token:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function verifyToken(req, res) {
  const { token } = req.params;
  try {
    const isValid = await tokenModel.verifyToken(req.pool, token);
    res.json({ valid: isValid });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

async function invalidateToken(req, res) {
  const { token } = req.params;
  try {
    await tokenModel.invalidateToken(req.pool, token);
    res.json({ message: "Token invalidado correctamente" });
  } catch (error) {
    console.error("Error al invalidar el token:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

module.exports = {
  generateToken,
  verifyToken,
  invalidateToken,
};
