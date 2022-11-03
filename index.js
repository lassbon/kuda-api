require('dotenv').config()
const express = require('express')
const app = express()
const mysql = require('mysql2')
const bodyParser =require('body-parser')
const sequelize  =require('./config/sequelize')
const port =process.env.APP_PORT
const router =require('./routes/customer.route')
app.use(bodyParser.json())




app.listen(port, ()=>{

sequelize.authenticate()
    .then(successdata =>{
        console.log('Connection has been established successfully.');
    })
  
    .catch (error=>{
        console.error('Unable to connect to the database:', error);
    }) 

})