require('dotenv').config()
const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT
const bookingRoute = require('./routes/booking.routes')



app.use(bodyParser.json())
app.use(bookingRoute)

// database connection




// setting up your server
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
