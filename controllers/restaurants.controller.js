const express = require('express');

//Controllers


//Midlewares

const {
    authentication,
    protectUserAccount
} = require('../middleware/auth.middleware');

const {
    restaurantValidator
} = require('../middleware/validators.middleware')


//Router

const restaurantRouter = express.Router();

//Endpoints

restaurantRouter.post('/', //Create Restaurant
)

restaurantRouter.get('/', // get all restaurants active
)


restaurantRouter.get('/:id', //get restaurant by id

)

restaurantRouter.patch('/:id', //update restaurant

)

restaurantRouter.delete('/:id', //Delete restaurant

)