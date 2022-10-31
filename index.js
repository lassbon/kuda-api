require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql =require('mysql2')
const port = process.env.APP_PORT


app.use(bodyParser.json())


const connection = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    port     : process.env.DATABASE_PORT,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE_NAME
  });

  connection.connect()



app.listen(port, () =>{

    sequelize.authenticate({
    

    })

})

