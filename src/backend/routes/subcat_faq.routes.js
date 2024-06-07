const express = require("express");
const router = express.Router();
const subcat_faqController = require("../controllers/subcat_faq.controller");

// Manejador GET para la ruta /api/subcat_faqs/
router.get("/", subcat_faqController.getAllSubcat_faqs);

// Middleware para registrar solicitudes POST
router.post("/", subcat_faqController.createSubcat_faq);

// Middleware para registrar solicitudes DELETE
router.delete("/:id", subcat_faqController.eliminarSubcat_faq);

module.exports = router;
