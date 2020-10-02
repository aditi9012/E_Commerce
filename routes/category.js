var express = require('express');
var app = express.Router();

const CategoryRoute = require('../controllers/category');
const auth = require("../config/auth");
app.get("/", CategoryRoute.getCategories );
app.get("/:id", CategoryRoute.getCategoriesById );
app.get("/inProduct/:product_id", CategoryRoute.getCategoriesInProduct );
module.exports = app;