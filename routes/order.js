
var express = require('express');
var app = express.Router();
const auth = require("../middleware/auth");
const orderRoute = require('../controllers/order')

app.post("/", auth, orderRoute.placeOrder);

app.post("/buyNow", auth, orderRoute.buyNow);

app.get("/:id", auth, orderRoute.getOrderById);

app.get("/inCustomer/:customer_id",auth,orderRoute.getOrdersInCustomer);

app.get("/shortDetail/:id",auth, orderRoute.getShortDetail);

module.exports = app;