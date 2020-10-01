const Sequelize = require("sequelize");

const sequelize = require("../config/db.config");

const Category = sequelize.define("categories", {
  category_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
 
  
   
});

module.exports = Category;