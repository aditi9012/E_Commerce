const {to} = require('await-to-js');
const Sequelize = require('sequelize');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../config/db.config');
const validation = require('../Joi/validations');


let key = 'mysecretkey';

const generateToken = (password, key) => {

    let token = jwt.sign(password, key);
    return token;
}

const passwordHash = async (password) => {
    const saltRounds = 10;
    const [err, passwordHash] = await to(bcrypt.hash(password, saltRounds));
    if (err) {
        return res.send({"msg": "Error while generating password hash"}); 
    }
    return passwordHash;
};

/*********************get by Id*************************/
exports.getCustomerById = async(req, res) => {
    let [err, result] = await to( db.customerModel.findAll({
        where: {
            customer_id: req.params.id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
            return res.json({ result });
        } else {
            return res.json({
                message:"No customer found!!!"
            });
        }
    } else {
        return res.json({
          'Data':null,
          'Error': err
        })
    }
}

/********************Sign Up***********************/
exports.signup = async(req, res) => {
    const {email, name, password} = req.body;

    let validate = await validation.phone_number.validate(req.body);

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload !!!" });
    }
    
    [err, result] = await to ( db.customerModel.findAll({
        where: {
            phone_number: phone_number
        }
    }) )
    customer = result[0];
    if(customer){
        return res.status(400).send({ data: null, error: `This mobile number is already registered!!!` });
    }

    let encryptedPassword = await  passwordHash(password);

    [err, result] = await to(
        db.customerModel.create({
            email, name, encryptedPassword
    }) )
    if(!err){
        return res.json({
            "msg": "New customer created Successfully!!!"
        });
    } else{
        return res.json({"data":null, "error": err})
    }
}



/************************** Login ***********************************/
exports.login = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let validate = await validation.login.validate(req.body);

    if(validate && validate.error)
    {
        return res.json({ data: null, error: error.message });
    }

    let [err, result] = await to(db.customerModel.findAll({
        where:{
            email: email
        }
    }) )
    let customer = result[0];
    if(customer == null){
        return res.json({
        "error": "Incorrect email !!!"
        });
    }
    
    let [error, isValid] = await to(
        bcrypt.compare(password, customer.encryptedPassword )
    );
    if(!isValid){
        return res.status(400).json({ "error": "Incorrect Password !!!"});
    }
    else{
        return res.json({
            message: "Logined Successfully !!!",
            token: generateToken(customer.encryptedPassword,key)
        }) 
    }
}

/*********************Update Mobile number**************************/
exports.updateNumber = async(req, res) => {
    let customerId = req.params.id;
    let mobile_number = req.body.phone_number;

    let validate = await validation.phone_number.validate({mobile_number});

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid!!!"});
    }

    let [err, result] = await to( db.customerModel.findAll({
        where:{
        customer_id: customerId
        }
    }) );
    let customer = result[0];
    if(customer == null){
        res.json({
        message: "No customer !!!"
        });
    } 

    [err, result] = await to(
        db.customerModel.update({ mobile_number: mobile_number}, 
            { 
                where: {
                customer_id: customerId
        } })
    );
    if(!err){
        res.json({ 
            "Message": "mobile number updated successfully !!!"
        })
    } else {
        return res.status(500).send({ data: null, err });
    }
}

/********************Update Address********************/
exports.updateAddress = async(req, res) => {
    let customerId = req.params.id;
    let address = req.body.address;

    let validate = await validation.address.validate({address});

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload !!!"});
    }

    let [err, result] = await to( db.customerModel.findAll({
        where:{
        customer_id: customerId
        }
    }) );
    let customer = result[0];
    if(customer == null){
        res.json({
        message: "No customer found !!!"
        });
    } 

    [err, result] = await to(
        db.customerModel.update({ address: address }, 
            { 
                where: {
                customer_id: customerId
        } })
    );
    if(!err){
        res.json({ 
            "Message": "Address updated successfully !!!"
        })
    } else {
        return res.status(500).send({ data: null, err });
    }
}

/*********************Update CreditCard****************************/
exports.updateCreditCard = async(req, res) => {
    let customerId = req.params.id;
    let card_number = req.body.card_number;

    let validate = await validation.card_number.validate({card_number});

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid!!!"});
    }

    let [err, result] = await to( db.customerModel.findAll({
        where:{
        customer_id: customerId
        }
    }) );
    let customer = result[0];
    if(customer == null){
        res.json({
        message:"No customer found !!!"
        });
    } 

    [err, result] = await to(
        db.customerModel.update({ card_number: card_number}, 
            { 
                where: {
                customer_id: customerId
        } })
    );
    if(!err){
        res.json({ 
            "Message": "details updated Succefully!!!"
        })
    } else {
        return res.status(500).send({ data: null, err });
    }
}
