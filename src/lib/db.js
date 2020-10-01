const {to}=require('await-to-js');
const {Sequelize,DataType}=require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
    process.env.DATABASE,
    process.env.USER,
    process.env.PASSWORD,
    {
        host : process.env.HOST,
        dialect : 'mysql'
    }
)
const connect = async ()=>{
    await connection.sync();
    let [err, result] = await to(connection.sync({ alter: false}));

    if(err)
        console.log("Error in connecting to Database !");
    else
        console.log('Connected to Database');
}


module.export={
    connect,
connection
}