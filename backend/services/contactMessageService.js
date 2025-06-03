// Service pour gérer les messages de contact
const ContactMessage = require("../models/ContactMessage");

const contactMessageService = {
  async getAllMessages() {
    return await ContactMessage.findAll({ order: [["createdAt", "DESC"]] });
  },
};

module.exports = contactMessageService;
