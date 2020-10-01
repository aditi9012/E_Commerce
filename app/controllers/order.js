const {to} = require('await-to-js');
const Sequelize = require('sequelize');

const db = require('../config/db.config');
const validation = require('../Joi/validations');
const customer = require('../controllers/customer')



/*************************get by Id************************/
exports.getOrderById = async(req, res) => {
    let [err, result] = await to( db.orderModel.findAll({
        attributes: ['order_id','product_id','attributes','product_name','quantity','price','total'],
        where:{
            order_id: req.params.id
        }
    }) )
    if (err){
      return res.json({"Data":null, "Error": err});
    }
    else{
      return res.json({ result });
    }
}

/***********************Place Order*****************************/
exports.placeOrder = async(req, res) => {
    try{
        const {shipped_on, customer_id, status} = req.body;
    
        let [err, result] = await to( db.cartModel.findAll({
          attributes: { exclude: ["createdAt", 'updatedAt', "item_id"]},
          where:{
            customer_id: customer_id
          }
        }) );
    
        let order_data = [];
    
        result.forEach( elem => {
          let tmp = elem.dataValues;
          tmp["status"] = status;
          tmp["shipped_on"] = shipped_on;
          order_data.push(tmp);
        })
        
        if (order_data === undefined) {
          order_data = {}
        };
    
        [err, result] = await to(db.orderModel.bulkCreate(order_data));
        if (err){
          return res.json({"Data":null, "Error": err});
        } else {
            db.cartModel.destroy({
              where:{
                  customer_id: customer_id
              }
            })
            return res.json({ message: "Order has been placed!!!" })
        }  
      } catch (err) {
          return res.json({
              'data': null,
              'error': {
                  'message': err.message
              }
          }) 
      } 
}



/*****************************Buy Now****************************/
exports.buyNow = async(req, res) => {
    const {shipped_on,customer_id, status, size, quantity, product_id, address} = req.body;

    let [err, result] = await to( db.productModel.findAll({
        where:{
            product_id: product_id
        }
    }) );

    let product_name = result[0]['name'];
    let unit_cost = result[0]['price'];
    if(quantity == 1){
        subtotal = unit_cost;
    } else{
        subtotal = unit_cost*quantity;
    }
    
    [err, result] = await to( db.orderModel.create({
        product_name: product_name,
        customer_id: customer_id,
        attributes: size,
        product_id: product_id,
        price: unit_cost,
        total: subtotal,
        quantity: quantity,
        shipped_on: shipped_on,
        status: status,
        address: address
        }) );
    if (err){
        return res.json({"Data":null, "Error": err});
    } else {
        return res.json({ message: "Order has been placed!!!" })
    }
}



/********************get order in customer*************************/

exports.getOrdersInCustomer = async(req, res) => {
    const customer_id = req.params.customer_id;
    [err, result] = await to( db.orderModel.findAll({
        attributes: {
        exclude: ['createdAt', 'updatedAt']
        },
        where: {
            customer_id: customer_id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
            res.json({ result });
        } else {
            return res.json({
                message: "No order !!!"
            });
        }
    } else {
        return res.json({
        'Data':null,
        'Error': err
        })
    }
}

