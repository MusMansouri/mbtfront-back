// Contrôleur pour les messages de contact
const contactMessageService = require("../services/contactMessageService");

const contactMessageController = {
  async getAllMessages(req, res) {
    try {
      const messages = await contactMessageService.getAllMessages();
      res.json(messages);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des messages." });
    }
  },
};

module.exports = contactMessageController;
