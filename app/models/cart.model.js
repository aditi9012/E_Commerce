const Sequelize = require("sequelize");

const sequelize = require("../config/db.config");
const Customer = require("./customer.model");
const Product = require("./products.model");

const Cart = sequelize.define("cart", {
  customer_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references:{
        model:Customer,
        key:'customer_id'
    }
  },
  item_id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true
  },
  customer_id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      references:{
          model:Customer,
          key:'customer_id'
      }
  },
  product_name:{
      type:Sequelize.STRING,
      allowNull:false,
      references:{
          model:Product,
          key:'name'
      }
  },
  product_id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      references:{
          model:Product,
          key:'product_id'
      }
  },

  price:{
      type:Sequelize.INTEGER,
      allowNull:false
  },
  quantity:{
      type:Sequelize.INTEGER,
      allowNull:false,
      defaultValue:1
  },
  total:{
      type:Sequelize.INTEGER,
      allowNull:true
  },
  attributes:{
      type:Sequelize.STRING,
      allowNull:false
  }
});

module.exports = Cart;