
var express = require('express');
var app = express.Router();
const auth = require("../config/auth");
const orderRoute = require('../app/controllers/order')

app.post("/", auth, orderRoute.placeOrder);
app.post("/buyNow", auth, orderRoute.buyNow);
app.get("/:id", auth, orderRoute.getOrderById);
app.get("/inCustomer/:customer_id",auth,orderRoute.getOrdersInCustomer);



module.exports = app;