const joi = require('joi');

const signup = joi.object().keys({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
});

const phone_number = joi.object().keys({
    phone_number: joi.number().integer().min(1000000000).max(9999999999).required() 
});

const login = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required()
});

const card_number = joi.object().keys({
    card_number: joi.number().required()
});

const address = joi.object().keys({
    address: joi.string().required()
});

const add_category = joi.object().keys({
    name: joi.string().required()
});

const add_products = joi.object().keys({
    name: joi.string().required(),
    price: joi.number().positive().required(),
    description: joi.string().required(),
    customer_id: joi.number().required()
});

const add_order = joi.object().keys({
    product_id: joi.number().required(),
    quantity: joi.number().required(),
    size: joi.string().required()
});

const add_review = joi.object().keys({
    review: joi.string().required(),
    rating: joi.number().integer().min(1).max(5).required() 
});

module.exports = {
    login, signup, card_number, address, phone_number,
    add_category, add_products, add_order, add_review
}