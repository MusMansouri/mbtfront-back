-- Renomme les colonnes pour correspondre au modèle Sequelize (snake_case)

ALTER TABLE `contact_messages`
  CHANGE COLUMN `firstName` `first_name` VARCHAR(255) NOT NULL,
  CHANGE COLUMN `lastName` `last_name` VARCHAR(255) NOT NULL;
