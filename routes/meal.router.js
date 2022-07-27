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

)

mealsRouter.get('/', //Get all meals active

)

mealsRouter.get('/:id', //Get meal by id

)

mealsRouter.patch('/:id', //Update Meals // Only admin

)

mealsRouter.delete('/:id', //Desactive Meals // Only admin

)


module.exports = { mealsRouter};