var express = require('express');
var app = express.Router();

const CustomerRoute = require('../controllers/customer');
const auth = require("../config/auth");

app.get("/:id", CustomerRoute.getCustomerById);
app.post('/signup', CustomerRoute.signup);
app.post('/login', CustomerRoute.login);
app.put("/:id/update", auth, CustomerRoute.updateNumber);
app.put("/:id/creditcard", auth, CustomerRoute.updateCreditCard);
app.put("/:id/address", auth, CustomerRoute.updateAddress);
module.exports = app;