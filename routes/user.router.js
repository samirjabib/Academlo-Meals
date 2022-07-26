const express = require('express');

//Controllers 

const { 
    singUp,
    deleteUser,
    login,
    updateUser
} = require('../controllers/users.controller');

//Middlewares 

const {
    authentication,
    protectUserAccount
} = require('../middleware/auth.middleware');

const {
    userValidator
} = require('../middleware/validators.middleware')

const { userExist } = require('../middleware/users.middleware')

//Router

const usersRouter = express.Router();

//EndPoints 

usersRouter.post('/signup', //create user
    userValidator,
    singUp
)

usersRouter.post('/login', //login account
    login
)

usersRouter.patch('/:id', //update user 
    authentication,
    userExist,
    protectUserAccount,
    updateUser
)

usersRouter.delete('/:id', //delete user
    authentication,
    userExist,
    protectUserAccount,
    deleteUser
)



module.exports = { usersRouter };
