const express = require('express');



const app = express(); //Init express


app.use(express.json()); // Enable incoming JSON

module.exports = { app };