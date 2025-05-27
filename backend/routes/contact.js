const express = require("express");
const router = express.Router();
const ContactMessage = require("../models/ContactMessage"); // Ajout

router.post("/", async (req, res) => {
  const { firstName, lastName, email, tel, message } = req.body;
  if (!firstName || !lastName || !email || !message) {
    return res
      .status(400)
      .json({ error: "Tous les champs obligatoires doivent être remplis." });
  }
  try {
    await ContactMessage.create({
      firstName,
      lastName,
      email,
      tel,
      message,
    });
    res.status(200).json({ message: "Votre message a bien été reçu. Merci !" });
  } catch (err) {
    console.error(err); // Ajout pour debug
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement du message." });
  }
});

module.exports = router;
