const Sequelize = require("sequelize");

const sequelize = require("../config/db.config");

const Customer = sequelize.define("customer", {
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
  hashedPassword: {
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
  contact_no: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  credit_card: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Customer;