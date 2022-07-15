const { db, DataTypes} = require('../utils/database.util');

const Order = db.define('order', {
    id:{
        primaryKey:true,
        unique:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    mealId:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    totalPrice:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:'active'
    },
    status:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: "active"
    }
});


module.exports = { User}