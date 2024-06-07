const express = require("express");
const router = express.Router();
const faqController = require("../controllers/faq.controller");

// Manejador GET para la ruta /api/faqs/
router.get("/", faqController.getAllFaqs);

// Middleware para registrar solicitudes POST
router.post("/", faqController.createFaq);

// Middleware para registrar solicitudes DELETE
router.delete("/:id", faqController.eliminarFaq);

// Middleware para registrar solicitudes PUT (modificar)
router.put("/:id", faqController.updateFaq);

module.exports = router;
