
//Models

const { Restaurant } = require('../models/restaurants.model');
const { Review } = require('../models/reviews.model');

//Utils 
const { catchAsync } = require('../utils/catchAsync.util');

const newRestaurant = catchAsync(
    async (req, res ,next) =>{
        
        const { name, address, rating } = req.body;

        const newRestaurant = await Restaurant.create({
            name,
            address,
            rating
        });

        res.status(200).json({
            status:"success",
            newRestaurant
        })
    }
);

const activeRestaurants = catchAsync(
    async (req, res ,next) => {
        
        const restaurants = await Restaurant.findAll({
            where:{status:"active"},
        });

        res.status(200).json({
            status:"success",
            restaurants
        })
    }
)

const getRestaurantById = catchAsync(
    async (req, res ,next) => {
        
        const { restaurant } = req;

        res.status(200).json({
            status:"success",
            restaurant
        })
    }
)

const updateRestaurant = catchAsync(
    async (req, res ,next) =>{
        //Only update name and address

        const { restaurant } =req;
        const { name, address } =req.body;

        await restaurant.update({
            status:"success",
            restaurant
        })

        res.status(204).json({
            status:"success"
        });
    }
)


const closeRestaurant = catchAsync(
    async (req, res, next) =>{
        //only admin can do

        const { restaurant } =req;

        await restaurant.update({
            status:"closed"
        });

        res.status(204).json({
            status:"success"
        });
    }
)


module.exports = {
    newRestaurant,
    activeRestaurants,
    getRestaurantById,
    updateRestaurant,
    closeRestaurant
    
}