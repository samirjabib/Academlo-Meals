const express = require('express');


//Middleware
const { authentication, isAdmin } = require('../middleware/auth.middleware');
const { mealValidator } = require('../middleware/validators.middleware')

//Controller

const { 
    newMeal,
    getMeals,
    getMealById,
    deleteMeal,
    updateMeal
} = require('../controllers/meals.controller')

//Routes

const mealsRouter = express.Router();

//endpoints


mealsRouter.post('/:id', //Create Meal
    authentication,
    mealValidator,
    newMeal
)

mealsRouter.get('/', //Get all meals active
    getMeals
)

mealsRouter.get('/:id', //Get meal by id
    getMealById
)

mealsRouter.patch('/:id', //Update Meals // Only admin
    authentication,
    isAdmin,
    updateMeal
)

mealsRouter.delete('/:id', //Desactive Meals // Only admin
    authentication,
    isAdmin,
    updateMeal
)


module.exports = { mealsRouter};