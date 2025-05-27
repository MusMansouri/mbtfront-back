const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class ContactMessage extends Model {}

ContactMessage.init(
  {
    firstName: { type: DataTypes.STRING, field: "first_name" },
    lastName: { type: DataTypes.STRING, field: "last_name" },
    email: DataTypes.STRING,
    tel: DataTypes.STRING,
    message: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "ContactMessage",
    tableName: "contact_messages",
  }
);

module.exports = ContactMessage;
