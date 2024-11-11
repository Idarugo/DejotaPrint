const express = require("express");
const router = express.Router();
const { WebpayPlus, Options, Environment } = require("transbank-sdk");

// Credenciales de prueba proporcionadas por Transbank
const commerceCode = "597055555532"; // Código de comercio de prueba
const apiKey = "11223344-55aa-66bb-77cc-889900112233"; // API Key de prueba
const environment = Environment.Integration; // Entorno de integración

const transaction = new WebpayPlus.Transaction(
  new Options(commerceCode, apiKey, environment)
);

// Ruta para iniciar el pago con Transbank
router.post("/", async (req, res) => {
  const { amount, sessionId, buyOrder, returnUrl } = req.body;

  try {
    const createResponse = await transaction.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );
    res.json(createResponse);
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).send(`Error creating transaction: ${error.message}`);
  }
});

// Ruta para confirmar el pago con Transbank
router.post("/confirmacion", async (req, res) => {
  const { token_ws } = req.body;

  try {
    const commitResponse = await transaction.commit(token_ws);

    if (commitResponse.status === "AUTHORIZED") {
      // Aquí puedes manejar la lógica de éxito del pago
      res.redirect("/exito");
    } else {
      // Aquí puedes manejar la lógica de error del pago
      res.redirect("/error");
    }
  } catch (error) {
    console.error("Error confirming transaction:", error);
    res.status(500).send(`Error confirming transaction: ${error.message}`);
  }
});

module.exports = router;
