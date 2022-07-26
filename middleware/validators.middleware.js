const { body, validationResult } = require('express-validator');


//Utils

const { AppError } = require('../utils/appError.util');


const checkResult = (req, res, next) => {
    
    const errors = validationResult(req);

    console.log(errors)

    if(!errors.isEmpty()){
        const errorMsgs = error.array().map( err => err.msg) // This function return my array with the errors
        const message = errorMsgs.join('.')
        return next ( new AppError(message, 500));
    }

    next();
}


const userValidator = [
    body('name')
        .notEmpty().isString().isLength({ min:2})
            .withMessage("name can not be empty"),
    body('email')
        .isEmail().notEmpty()
            .withMessage('must provide a valid email'),
    body('password')
        .isLength({min:8})
            .withMessage('passwrod must be at least 8 characters long')
        .isAlphanumeric()
            .withMessage('passwrod must contain letters and numers'),
    checkResult,
]

const restaurantValidator = [
    body('name')
        .notEmpty().isString().isLength({min :2})
            .withMessage("name can not be empty"),
    body('address')
        .notEmpty().isString().isLength({ min: 2})
            .withMessage("address can not be empty"),
    checkResult,
]


const mealValidator = [
    body('name')
        .notEmpty().isString().isLength({min : 2})
        .withMessage("name can not be empty"),
    body('price')
        .notEmpty().isNumeric().isLength({min: 1}),
    checkResult,
]


module.exports = { userValidator, restaurantValidator, mealValidator}