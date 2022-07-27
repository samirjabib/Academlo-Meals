const express = require ('express');




//Middlewares

const { authentication} = require('../middleware/auth.middleware');
const { orderExist } = require('../middleware/orders.middleware')


//Controller

const {
    createOrder,
    getAllUserOrders,
    orderCancelled,
    orderCompleted
} = require('../controllers/orders.controller')

//Router

const orderRouter = express.Router();

//endpoints

orderRouter.post('/', //Create order
    authentication,
    createOrder,
);

orderRouter.get('/me', // user order
    authentication,
    getAllUserOrders,
);

orderRouter.patch('/:id', //Order completed
    authentication,
    orderExist,
    orderCompleted
)

orderRouter.delete('/:id', //Order canceled
    authentication,
    orderExist,
    orderCancelled
)


module.exports = { orderRouter }