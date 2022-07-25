const express = require('express');


//Routes
const { usersRouter } = require('./routes/user.router');
const { AppError } = require('./utils/appError.util');


//Global err controller
const {globalErrorHandler } = require('./controllers/error.controller')


const app = express(); //Init express



app.use(express.json()); // Enable incoming JSON




//Hnadle incoming unknow routes to the server

app.all('*', (req, res, next) =>{
    next(
        new AppError(
            `${req.method} ${req.originalUrl} not found in this sever`,
            404
        )
    )
})

app.use(globalErrorHandler);

module.exports = { app };