const { db, DataTypes} = require('../utils/database.util');

const User = db.define('user', {
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
    email:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'active'
    },
    role:{
        type:DataTypes.STRING,
        allowNull:true,
        defaultValue: "client"
    }
});


module.exports = { User}