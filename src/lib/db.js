const {to}=require('await-to-js');
const {Sequelize,DataTypes}=require('sequelize');
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

const Customer = connection.define( 'customer', {
    customer_id: {
       type: DataTypes.BIGINT(11),
       autoIncrement:true,
       allowNull:false,
       primaryKey:true 
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
        allowNull: true
    },
    card_number:{
        type: DataTypes.BIGINT(11),
        allowNull: true
    },
    mobile_no:{
        type: DataTypes.BIGINT(11),
        allowNull: false
    },
    encryptedPassword:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Category = connection.define( 'categories', {
    category_id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    }
})

const Product = connection.define( 'product', {
    product_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    discounted_price:{
        type: DataTypes.FLOAT,
        allowNull: true
    },
    category_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references:{
            model: Category,
            key: 'category_id'
        }
    }
})

const Review = connection.define ( 'review',{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    review:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references:{
            model: Product,
            key: 'product_id'
        }
    }
})

const Order = connection.define('order', {
    order_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references:{
            model: Customer,
            key: 'customer_id'
        }
    },
    product_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references:{
            model: Product,
            key: 'product_id'
        }
    },
    attributes:{
        type: DataTypes.STRING,
        allowNull: false
    },
    product_name:{
        type: DataTypes.STRING,
        allowNull: false,
        references:{
            model: Product,
            key: 'name'
        }
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    total:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    shipped_on:{
        type: DataTypes.DATE,
        allowNull: true
    },
    status:{
        type: DataTypes.ENUM,
        values: ['payment done', 'waiting', 'shipped', 'delivered succesfully'],
        allowNull: true
    }
})

const Cart= connection.define( 'cart', {
    item_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references:{
            model: Customer,
            key: 'customer_id'
        }
    },
    product_name:{
        type: DataTypes.STRING,
        allowNull: false,
        references:{
            model: Product,
            key: 'name'
        }
    },
    attributes:{
        type: DataTypes.STRING,
        allowNull: false
    },
    product_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references:{
            model: Product,
            key: 'product_id'
        }
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    total:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
})

const connect = async ()=>{
    await connection.sync();
    let [err, result] = await to(connection.sync({ alter: false}));

    if(err)
        logger.error("Error in connecting to Database !");
    else
        logger.info('Connected to Database');
}



module.exports = {
    connect, Customer, Product, Category, Order, 
    Review, Cart
}