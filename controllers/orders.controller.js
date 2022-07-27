const express = require('express');




//Models 
const { Order } = require('../models/orders.model');
const { Meal } = require('../models/meals.model');
const { Restaurant } = require('../models/restaurants.model');
const { User } = require('../models/users.model');



//Utils 
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


//Controllers
const createOrder = catchAsync(
    async (req, res, next) => {
        const { userActive } = req;
        const { quantity, mealId } = req.body;

        const meal = await Meal.findOne({
            where:{ id: mealId },
        })

        if(!meal){
            return next( AppError('Meal not found',404))
        }


        const mealPrice = meal.price * quantity;

        const order = await Order.create({
            mealId:meal.id,
            userId:userActive.id,
            totalPrice: mealPrice,
            quantity,
        })

        res.status(200).json({
            status:"success",
            order
        })
    }
)

const getAllUserOrders = catchAsync( 
    async (req, res, next) => {

        const orders = await Order.findOne({
            
            where:{
                status:"active"
            },
            attributes:[
                "id",
                "userId",
                "quantity"
            ],

            include:[{
                model:User,
            }],

            include:[{
                model:Meal,
                attributes:["name","price","status"],
                include:[{
                    model:Restaurant,
                    attributes:["name","address"]
                }]
            }]
        })
        res.status(200).json({
            status:"success",
            orders
        })
    }
)

const orderCompleted = catchAsync(
    async (req, res, next) => {
        const { order } = req;

        await order.update({
        status:"complete"
        })

        res.status(200).json({
            status:"success",
        })
    }
)

const orderCancelled = catchAsync(
    async (req, res, next) => {
        
        const { order } = req;

        await order.update({
            status:"delete"
        })

        res.status(200).json({
            status:"success",
        })
    }
)

module.exports = {createOrder, getAllUserOrders, orderCompleted, orderCancelled}