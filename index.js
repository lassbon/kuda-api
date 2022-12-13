require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.APPPORT
//const  sequelize  = require('./config/sequelize')
const displayRoutes = require('express-routemap');
const bodyParser = require('body-parser')
const registerRoute = require('./route/customer')


app.use(bodyParser.json())

app.use(registerRoute)

app.listen(port, () => {

    // sequelize.authenticate()
    // .then(sucessData => {
    //         console.log('Connection has been established successfully.');
    // })
    // .catch(error => {
    //         console.error('Unable to connect to the database:', error);
    // })
    
})

console.log(`Example app listening on port ${port}`)