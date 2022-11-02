require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.APP_PORT
const bodyParser = require('body-parser')

app.listen(port)