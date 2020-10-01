const Sequelize = require("sequelize");

const sequelize = require("../config/db.config");
const Category = require("./category.model");
const Customer = require("./customer.model");
const Product = require("./products.model");

const Order = sequelize.define("orders", {
  order_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
 customer_id:{
     type:Sequelize.INTEGER,
     allowNull:false,
     references:{
         model:Customer,
         key:'customer_id'
     },
     product_id:{
         type:Sequelize.INTEGER,
         allowNull:false,
         references:{
             model:Product,
             key:'product_id'
         },
         attributes:{
             type:Sequelize.STRING,
             allowNull:false
         },
         product_name:
         {
             type:Sequelize.STRING,
             allowNull:false,
             references:{
                 model:Product,
                 key:'name'
             }
         },
         quantity:{
           type:Sequelize.INTEGER,
           allowNull:false,
           defaultValue:1
         },
         status:{
             type:Sequelize.ENUM,
             values:['payment successful','shipping','shipped','successfully delivered','returned'],
             allowNull:true
         },
         total:{
             type:Sequelize.INTEGER,
             allowNull:false
         },
         shipped_date:{
             type:Sequelize.DATE,
             allowNull:false
         }


     }
 }
  
 
  
});

module.exports = Order;