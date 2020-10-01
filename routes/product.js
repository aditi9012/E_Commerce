var express = require('express');
var app = express.Router();

const auth = require("../app/config/auth.config");
const productRoute = require('../app/controllers/product');

app.get("/", productRoute.getProducts);
app.get("/:id",productRoute.getProductsById);
app.get("/search/:name",productRoute.searchProducts);
app.get("/inCategory/:category_id",productRoute.getProductsInCategory);
app.get("/:id/detail",productRoute.getDetailsById);
app.get("/:id/reviews",productRoute.getReviews);
app.post("/:id/reviews", auth,productRoute.addReviews);

module.exports = app;