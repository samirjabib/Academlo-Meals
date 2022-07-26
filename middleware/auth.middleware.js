//Library
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config({ path: './config.env' }); 


//Models 

const { User } = require('../models/users.model');

//Utils

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


const authentication = catchAsync(
    async(req, res, next) => {

        //we extract the token

        let token = undefined;

        if( req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
    
        if(!token){
            return next( new AppError('Invalid Token'),403);
    
        }

        //Validar si el token caduco
        const decoded = await jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        const userActive = await User.findOne( {where : { id: decoded.id}, status:"active"})

        if(!userActive){
            return next ( new AppError(" The owner of this token dont exits anymore", 403))
        }

        req.userActive = userActive;
        req.tokendId = decoded.id
        
        next()
    }
)


const protectUserAccount = catchAsync(
    async(req, res ,next) => {
        const { userActive, user } = req;
        
        if(userActive.id !== user.id){
            return next ( new AppError( 'this account dont belong to you', 403))
        }

        next();
    }
)


const isAdmin = catchAsync(
    async (req, res ,next) =>{
        const { userActive } = req;


        if(userActive.role !== "admin"){
            return next( new AppError('the restaurant only can be update by the admin'))
        }
        next();
    }
)

module.exports = { authentication, protectUserAccount, isAdmin}