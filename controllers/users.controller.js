//Libraries 

const { bycrpyt } = require('bcryptjs');
const { jwt } = require('jsonwebtoken');

//Models

const { User } = require('../models/users.model');


//Utils 

const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util')


//Controllers

const singUp = catchAsync( async (req, res ,next) =>{

    const { name, email, password, role} = req.body;
    //encrypt pass

    const salt = await bycrpyt.genSalt(12);
    const hashPassword = await bycrpyt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password,
        password:hashPassword,
        role,
    });
    
    res.status(200).json({
        status:"succes",
        newUser
    });
});


module.exports = {
    singUp
}