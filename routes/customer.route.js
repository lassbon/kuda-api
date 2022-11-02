const express = require('express')
const router = express.Router()
const { register } = require('../controllers/customer.controllers')

// @route   POST api/customers
router.post('/register', register)




module.exports = router