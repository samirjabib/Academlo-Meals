const express = require('express');

//Controllers

const {
    activeRestaurants,
    closeRestaurant,
    getRestaurantById,
    newRestaurant,
    updateRestaurant,
    addReview,
    deleteReview,
    updateReview,
} = require('../controllers/restaurants.controller')

//Midlewares

const {
    authentication,
    isAdmin
} = require('../middleware/auth.middleware');

const { restaurantValidator } = require('../middleware/validators.middleware')

const { restaurantExist } = require('../middleware/restaurants.middleware')
const { reviewExist, reviewOwner } = require('../middleware/reviews.middleware')

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

restaurantRouter.post('/reviews/:restaurantId',  //Add Review
    authentication,
    addReview
)

restaurantRouter.patch('/reviews/:id', //update review
    authentication,
    reviewOwner,
    reviewExist,
    updateReview
)



restaurantRouter.patch('/reviews/:id', //Delete review
    authentication,
    reviewExist,
    reviewOwner,
    updateReview
)

module.exports = { restaurantRouter }