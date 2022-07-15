const { app } = require('./app');


//Utils

const { db } = require('./utils/database.util');



db.authenticate()
    .then( () => console.log('db authenticate'))
    .catch(err => console.log(err));


db.sync() 
    .then(() => console.log("db sync")) 
    .catch(err => console.log(err));


const PORT = process.env.PORT || 4050;


app.listen(PORT , () => {
    console.log('express app running!!', PORT);
})