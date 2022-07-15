const { db, DataTypes} = require('../utils/database.util');

const Meal = db.define('meal', {
    id:{
        primaryKey:true,
        unique:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    restaurantId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'active'
    }
});


module.exports = { Meal }