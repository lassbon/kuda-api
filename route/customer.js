const express = require('express')
const router = express.Router()
const { register, verifyEmailOtp } = require('../controllers/customer.controllers')

// @route   POST api/customers
router.post('/register', register)



router.get('/verify-email-otp/:_otp/:email', verifyEmailOtp)



module.exports = router