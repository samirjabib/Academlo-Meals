//Libraries 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Models

const { User } = require('../models/users.model');
const { Meal } = require('../models/meals.model');
const { Order } = require('../models/orders.model');
const { Restaurant } = require('../models/restaurants.model');



//Utils 

const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util')


//Controllers

const singUp = catchAsync( async (req, res ,next) =>{

    const { name, email, password, role} = req.body;

    //encrypt pass
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password,
        password:hashPassword,
        role,
    });

    // Remove password from response
	newUser.password= undefined;
    
    res.status(200).json({
        status:"succes",
        newUser
    });
});


const login = catchAsync(
    async(req, res , next) =>{

        const { email , password } = req.body

        console.log(password)
        
        //validar email

        const user = await User.findOne({
            where:{
                email,
                status:"active"
            }
        })

        console.log(user)

        if(!user){
            return next( new AppError('email is wrong', 400));
        }

        const confirmPassword = await bcrypt.compare(password, user.password)

        if(!confirmPassword){
            return next ( new AppError('password fail'), 400);
        }
        // Generate Token ( is the entrance ticket )

        const token = jwt.sign(
            {id: user.id},
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        )
        res.status(200).json({
            status:"succes",
            token,
        })
    }
)


const updateUser = catchAsync(
    async (req, res, next) =>{

        const { user }= req;
        const { name, email } = req.body;
        


        await user.update ( {name, email})

        res.status(204).json({ status: 'success'});



    }
)

const deleteUser = catchAsync(
    async (req, res, next) =>{
        const { user }= req;
        await user.update ( {status: 'deleted'});

        res.status(204).json({ status: 'success'});
    }
)


const getOrderByUser = catchAsync(
    async (req, res ,next) => {

        const { tokenId } = req;

        const userOrders = await User.findOne({
            where:{ id: tokenId },
            where:{ status: 'active' },
            attributes:["name","role"],

            include:[{
                model:Order,
                status:"active",
                attributes:["id","totalPrice","quantity"],

                include:[{
                    model:Meal,
                    attributes:["name","price"],

                    include:[{
                        model:Restaurant,
                        attributes:["name"]
                    }]
                }]
            }]
        })

        if(!userOrders){
            return next(new AppError("this user dont have orders",403))
        }

        res.status(200).json({
            status:"success",
            userOrders
        })
    }
)

const getOrderByid = catchAsync(
    async(req, res, next) =>{
        
        const { tokenId } =req;

        const { id } = req.params;

        const userOrderbyId = await User.findOne({

            where:{ id: tokenId },
            where : { status: "active" },
            attributes: ["name", "role"],

            include:[{
                model:Order,
                where:{ id },

                include:[{
                    model:Meal,
                    attributes:["name", "price"],

                    include:[{
                        model:Restaurant,
                        attributes:["name"]
                    }]
                }]
            }]
        })



    }
)

module.exports = {
    singUp,
    login,
    updateUser,
    deleteUser,
    getOrderByUser,
    getOrderByid
}


