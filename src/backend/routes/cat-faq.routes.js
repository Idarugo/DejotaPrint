const express = require("express");
const router = express.Router();
const cat_faqController = require("../controllers/cat_faq.controller");

// Manejador GET para la ruta /api/cat_faqs/
router.get("/", cat_faqController.getAllCat_faqs);

// Middleware para registrar solicitudes POST
router.post("/", cat_faqController.createCat_faq);

// Middleware para registrar solicitudes DELETE
router.delete("/:id", cat_faqController.eliminarCat_faq);

module.exports = router;
