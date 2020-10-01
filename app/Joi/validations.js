const Joi = require('joi');

const signup = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const mobile_number = Joi.object().keys({
    phone_number: Joi.number().integer().min(1000000000).max(9999999999).required() 
});

const login = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const card_number = Joi.object().keys({
    card_number: Joi.number().required()
});

const address = Joi.object().keys({
    address: Joi.string().required()
});

const add_category = Joi.object().keys({
    name: Joi.string().required()
});

const add_products = joi.object().keys({
    name: Joi.string().required(),
    price: Joi.number().positive().required(),
    description: Joi.string().required(),
    customer_id: Joi.number().required()
});

const add_order = joi.object().keys({
    product_id: joi.number().required(),
    quantity: joi.number().required(),
    size: joi.string().required()
});

const add_review = Joi.object().keys({
    review: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required() 
});

module.exports = {
    login, signup, card_number, address, mobile_number,
    add_category, add_products, add_order, add_review
}