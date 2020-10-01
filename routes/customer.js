var express = require('express');
var app = express.Router();

const CustomerRoute = require('../app/controllers/customer');
const auth = require("../app/config/auth.config");

app.get("/:id", CustomerRoute.getCustomerById);
app.post('/signup', CustomerRoute.signup);
app.post('/login', CustomerRoute.login);
app.put("/:id/update", auth, CustomerRoute.updateNumber);
app.put("/:id/creditcard", auth, CustomerRoute.updateCreditCard);
app.put("/:id/address", auth, CustomerRoute.updateAddress);
module.exports = app;