const {to} = require('await-to-js');
const Sequelize = require('sequelize');


const db = require('../config/db.config');
const validation = require('../Joi/validations');


/************************Get Products****************************/
exports.getProducts = async(req, res) => {
    let [err, result] = await to( db.Product.findAll() )
    if (err){
        return res.json({"Data":null, "Error": err});
    }
    let Products = JSON.stringify(result);
    [err, result] = await to(cache.setValue("Products", Products));
    if (err){
      return res.json({"Data":null, "Error": err});
    } else {
      result = JSON.parse(Products);
      return res.json({result});
    }
}



/********************Product By Id*******************************/
exports.getProductsById = async(req, res) => {

}



/**********************Search products******************************/

exports.searchProducts = async(req, res) => {
    const category = req.params.name;
    let [err, result] = await to( db.Product.findAll({
      where: {
          name: {
              [Sequelize.like]: '%' + category + '%'
          }
        }
    }) );
    if(!err) {
      if(result && result.length > 0) {
            return res.json({ result });
      } else {
            return res.json({
              message: "Not found !!!"
          });
      }
    } else {
        return res.json({
        'Data':null,
        'Error': err
      })
    }
}



/***************************get in category***********************************/
exports.getProductsInCategory = async(req, res) => {
    let [err, result] = await to( db.Product.findAll({
        attributes: ['name'],
        group: ['name'],
        where: {
            category_id: req.params.category_id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
            const count = result.length
            return res.json({ 'count': count ,  result });
        } else {
            return res.json({
                message: "No product of this category "
            });
        }
    } else {
        return res.json({
          'Data':null,
          'Error': err
        })
    }
}
/************************ Get details**********************************/

exports.getDetailsById = async(req, res) => {
    let [err, result] = await to( db.Product.findAll({
        attributes: ['name', 'description', 'price'],
        where: {
          product_id: req.params.id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
          res.json({ result });
        } else {
            return res.json({
              message: "No product !!!"
            });
        }
    } else {
        return res.json({
        'Data':null,
        'Error': err
      })
    }
}

/***********************get reviews*****************************/

exports.getReviews = async(req, res) => {
    let [err, result] = await to( db.Review.findAll({
        attributes: ['review'],
        where: {
          product_id: req.params.id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
            return res.json({ result });
        } else {
            return res.json({
              message: "No reviews !!!"
            });
        }
    } else {
        return res.json({
        'Data':null,
        'Error': err
      })
    }
}

/***********************add reviews*********************************/
exports.addReviews = async(req, res) => {
    const {review, name, rating} = req.body;

    let validate = await validation.add_review.validate(req.body);

    if(validate && validate.error)
    {
        return res.json({ data: null, error: error.message });
    }

    let [err, result] = await to( db.Order.findAll({
      where:{
        product_id: req.params.id
      }
    }) );

    if(result.length != 0){
      [err, result] = await to( db.Review.create({
        name: name,
        review: review,
        rating: rating,
        product_id: req.params.id
      }) );
      if (err){
            return res.json({"Data":null, "Error": err});
      }
      else{
            return res.json({ success: true });
      }
    }  
}