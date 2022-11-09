require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.APP_PORT
const  sequelize  = require('./config/sequelize')
const bodyParser = require('body-parser')
const displayRoutes = require('express-routemap');
const registerRoute = require('./routes/customer.route')


app.use(bodyParser.json())
app.use(registerRoute)

app.listen(port, () => {

    sequelize.authenticate()
    .then(sucessData => {
            console.log('Connection has been established successfully.');
    })
    .catch(error => {
            console.error('Unable to connect to the database:', error);
    })
    
})


displayRoutes(app)