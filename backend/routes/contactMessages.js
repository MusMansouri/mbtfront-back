const express = require("express");
const router = express.Router();
const contactMessageController = require("../controllers/contactMessageController");
const { verifyToken, isAdmin } = require("../middlewares/auth");

// Route pour récupérer tous les messages de contact (admin seulement)
router.get(
  "/messages",
  verifyToken,
  isAdmin,
  contactMessageController.getAllMessages
);

module.exports = router;
