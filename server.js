const { app } = require('./app');



//Models 

const { Meal } = require('./models/meals.model')
const { Order } = require('./models/orders.model')
const { Restaurant } = require('./models/restaurants.model')
const { Review } = require('./models/reviews.model')
const { User } = require('./models/users.model')

//Utils

const { db } = require('./utils/database.util');




//Relations

// <--
User.hasMany(Review,{foregeignKey:'UserId'})
Review.belongsTo(User);

User.hasMany(Order, { foreignKey:'userId'})
Order.belongsTo(User);

Restaurant.hasMany(Review,{ foregeignKey:'restaurantId'})
Review.belongsTo(Restaurant);

Restaurant.hasMany(Meal, { foregeignKey:'restaurantId'})
Meal.belongsTo(Restaurant);

Meal.hasOne(Order, { foregeignKey:'restaurantId'})
Order.belongsTo(Meal);



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