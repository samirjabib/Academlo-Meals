const express = require('express');

//Controllers

const {
    activeRestaurants,
    closeRestaurant,
    getRestaurantById,
    newRestaurant,
    updateRestaurant,
} = require('../controllers/restaurants.controller')

//Midlewares

const {
    authentication,
    protectUserAccount,
    isAdmin
} = require('../middleware/auth.middleware');

const { restaurantValidator } = require('../middleware/validators.middleware')

const { restaurantExist } = require('../middleware/restaurants.middleware')

//Router

const restaurantRouter = express.Router();

//Endpoints

restaurantRouter.post('/', //Create Restaurant
    authentication,
    restaurantValidator,
    newRestaurant,
)

restaurantRouter.get('/', // get all restaurants active
    activeRestaurants,
)


restaurantRouter.get('/:id', //get restaurant by id
    restaurantExist,
    getRestaurantById,
)

restaurantRouter.patch('/:id', //update restaurant
    authentication,
    isAdmin,
    restaurantExist,
    updateRestaurant,
)

restaurantRouter.delete('/:id', //Delete restaurant
    authentication,
    isAdmin,
    restaurantExist,
    closeRestaurant
)

module.exports = { restaurantRouter }