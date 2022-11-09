const express = require('express')
const router = express.Router()
const { register, verifyEmailOtpAndSendPhoneOtp,
    verifyPhoneOtp, resendPhoneOtp, resendEmailOtp } = require('../controllers/customer.controllers')

// @route   POST api/customers
router.post('/register', register)

router.get('/verify-email-otp/:_otp/:email/:phone', verifyEmailOtpAndSendPhoneOtp)

router.get('/verify-phone-otp/:phone_otp/:phone', verifyPhoneOtp)

router.post('/resend-phone-otp/:phone', resendPhoneOtp)

router.post('/resend-email-otp/:email', resendEmailOtp)

module.exports = router