const express = require('express');


//Utils
const { AppError } = require('./utils/appError.util');


const app = express(); //Init express
app.use(express.json()); // Enable incoming JSON



//Global err controller
const {globalErrorHandler } = require('./controllers/error.controller');


//Routes
const { usersRouter } = require('./routes/user.router');



//Endpoints
app.use('/api/v1/users', usersRouter);

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