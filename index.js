require('dotenv').config()
const express = require('express')
const cors = require ('cors')
const app = express()
const port = process.env.APP_PORT
const  sequelize  = require('./config/sequelize')
const bodyParser = require('body-parser')
const displayRoutes = require('express-routemap');
const registerRoute = require('./routes/customer.route')
const authRoute = require('./routes/auth.route')
const walletRoute = require('./routes/wallet.route')
const airtimeRoute = require('./routes/airtime.route')


app.use(cors())
app.use(bodyParser.json())
app.use(registerRoute)
app.use(airtimeRoute)
app.use(authRoute)
app.use(walletRoute)

app.listen(port, () => {

//     sequelize.authenticate()
//     .then(sucessData => {
//             console.log('Connection has been established successfully.');
//     })
//     .catch(error => {
//             console.error('Unable to connect to the database:', error);
//     })
    
})


displayRoutes(app)