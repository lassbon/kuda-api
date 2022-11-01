require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser =require('body-parser')
const sequelize  =require('./config/sequelize')
const port =process.env.APP_PORT

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