const Sequelize = require("sequelize");

const sequelize = require("../src/lib/db");

const Customer = sequelize.define("customers", {
  customer_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  encryptedPassword: {
    type: Sequelize.STRING,
  },
  isLoggedIn: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mobile_number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  card_number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Customer;