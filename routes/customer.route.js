const express =require('express')
const router = express.Router()
const { register } = require('../controllers/customer.controllers')

router.post('/register', register)