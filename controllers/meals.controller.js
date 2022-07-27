//Models

const { Meal } = require('../models/meals.model');
const { Restaurant } = require('../models/restaurants.model');


//Utils

const { catchAsync } = require('../utils/catchAsync.util');



//Controllers



const newMeal = catchAsync(
    async (req,res,next) =>{
    
        const {name, price} = req.body;
        const { id } = req.params;

        const restaurant = await Restaurant.findOne({ where:{ id } })
        
        const newFood = await Meal.create({
            name,
            price,
            restaurantId: restaurant.id
        })

        res.status(201).json({
            status:"succes",
            newFood
        })
    }
) 



const getMeals = catchAsync(
    async (req, res, next) => {
        

        const meals = await Meal.findAll({
            where:{ status:"avalaible"},
            include:[{
                model:Restaurant,
            }]
        })

        res.status(200).json({
            status:"success",
            meals,
        })
    }
);

const getMealById = catchAsync(
    async(req, res, next) => {

        const { id } = req.params;
        
        const meal = await Meal.findOne({
            where:{ id }, where:{ status: "available" },
            include:[
                {
                    model:Restaurant,
                    attributes:["name", "address", "raing", "status"]
                }
            ]
        })

        res.status(200).json({
            status:"success",
            meal
        })

    }
)

const updateMeal = catchAsync(
    async(req, res, next) =>{
        //Only admin can do it
        //Name, price

        const { id } = req.params;
        const { name, price } = req.body;
        
        const meal = await Meal.findOne({ where:{ id } });

        meal.update({
            name,
            price,
        })
        
        
        res.status(200).json({
            status:"success"
        })
    }
);

const deleteMeal = catchAsync(
    async (req, res, next) =>{
        //Only admin

        const { id } = req.params;
        const meal = await Meal.findOne({ where:{ id }})

        res.status(200).json({
            status:"success"
        })
    }
)

module.exports = {
    newMeal,
    getMeals,
    getMealById,
    updateMeal,
    deleteMeal,
}