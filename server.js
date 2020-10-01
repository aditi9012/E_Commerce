const express = require("express");
var app=express();
const bodyParser=require('body-parser');
const {logger}=require("./logger");
//const alert =require('./app/alert/sentry');

const PORT=process.env.PORT || 4000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//alert()

app.use("/customers",require("./routes/customer"));
app.use("/categories",require("./routes/category"));
app.use("/shoppingcart",require("./routes/cart"));
app.use("/categories",require("./routes/category"));
app.use("/orders",require("./routes/order"));
app.use("/products",require("./routes/product"));

app.listen(PORT,(req,res)=>{
 console.log(`Server running on ${PORT}`);
 logger.info(`server running on ${PORT}`);
});