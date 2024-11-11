const express = require("express");
const router = express.Router();
const disenoController = require("../controllers/diseno.controller");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/disenos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", disenoController.getAllDisenos);
router.get("/admin", disenoController.getAllDisenosAdmin);
router.post("/", upload.single("imagen"), disenoController.createDiseno);
router.put("/:id", upload.single("imagen"), disenoController.updateDiseno);
router.delete("/:id", disenoController.eliminarDiseno);

module.exports = router;
