const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const app=express();
var corOptions={
origin:"http://localhost:4000"
};
app.use(cors(corOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/test',(req,res)=>{
res.json({message:"welcome!!!"});
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});