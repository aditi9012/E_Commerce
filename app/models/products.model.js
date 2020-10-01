const Sequelize = require("sequelize");

const sequelize = require("../config/db.config");
const Category = require("./category.model");

const Product = sequelize.define("products", {
  product_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price:{
      type:Sequelize.INTEGER,
      allowNull:false
  },
  discount:{
      type:Sequelize.INTEGER,
      allowNull:true
  },
  category_id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      references:{
          model:Category,
          key:'category_id'
      }
  }
 
  
 
  
});

module.exports = Product;