const express = require("express");
var app=express();
const bodyParser=require('body-parser');

require("dotenv").config();
const http = require('http');

const PORT=process.env.PORT || 4000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/customers",require("./routes/customer"));
 
//app.use("/categories",require("./routes/category"));
// app.use("/shoppingcart",require("./routes/cart"));
// app.use("/categories",require("./routes/category"));
// app.use("/orders",require("./routes/order"));
// app.use("/products",require("./routes/product"));

const server= http.createServer((req, res) => {
    res.statusCode = 200;
    // res.end("/customers",require("./routes/customer"));
  });

server.listen(PORT,(req,res)=>{
 console.log(`Server running on ${PORT}`);


});
//server.use("/customers",require("./routes/customer"));
