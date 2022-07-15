const { db, DataTypes} = require('../utils/database.util');

const Restaurant = db.define('restaurant', {
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
    address:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    rating:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'active'
    }
});


module.exports = { Restaurant }