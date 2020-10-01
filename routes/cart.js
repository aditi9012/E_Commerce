var express = require('express');
var app = express.Router();
const CartRoute = require('../app/controllers/cart');
const auth = require("../app/config/auth.config");
app.get("/:id", auth, CartRoute.getProductsById);
app.post("/add", auth, CartRoute.addProducts);
app.put("/update/:item_id", auth, CartRoute.updateProduct);
app.delete("/empty", auth, CartRoute.deleteProducts);
app.get("/totalAmount/:id", auth, CartRoute.getTotalAmount);
app.delete("/removeProduct/:item_id", auth, CartRoute.deleteOneProduct);
module.exports = app;