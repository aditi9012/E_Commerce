const Sequelize = require("sequelize");

const sequelize = require("../src/lib/db");
const Product = require("./products.model");

const Review = sequelize.define("reviews", {
 
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  review: {
    type: Sequelize.STRING,
    allowNull: false,

  },
  rating:{
    type: DataTypes.INTEGER,
    allowNull: false
},
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references:{
        model: Product,
        key: 'product_id'
    }
  },
 
});

module.exports = Review;