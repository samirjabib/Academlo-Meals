const express = require('express');




//Models 
const { Order } = require('../models/orders.model');


//Utils 
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


//Controllers
const createOrder = catchAsync(
    async (req, res, next) => {
        
    }
)

const getAllUserOrders = catchAsync( 
    async (req, res, next) => {
        
    }
)

const orderCompleted = catchAsync(
    async (req, res, next) => {
        
    }
)

const orderCancelled = catchAsync(
    async (req, res, next) => {
        
    }
)

module.exports = {createOrder, getAllUserOrders, orderCompleted, orderCancelled}