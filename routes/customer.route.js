const express = require('express')
const router = express.Router()
const { register } = require('../controllers/customer.controllers')

// @route   GET api/customers
router.post('/register', register)
