const { db, DataTypes} = require('../utils/database.util');

const Review = db.define('Review', {
    id:{
        primaryKey:true,
        unique:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    restaurantId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    comment:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    rating:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
});

module.exports = { Review };