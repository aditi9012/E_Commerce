var express = require('express');
var app = express.Router();

const CategoryRoute = require('../app/controllers/category');
const auth = require("../app/config/auth.config");
app.get("/", CategoryRoute.getCategories );
app.get("/:id", CategoryRoute.getCategoriesById );
app.get("/inProduct/:product_id", CategoryRoute.getCategoriesInProduct );
module.exports = app;