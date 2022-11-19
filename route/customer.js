const express = require('express')
const router = express.Router()
const { register, verifyEmailOtpAndSendPhoneOtp, verifyPhoneOtp, resendPhoneOtp, resendEmailOtp, updateCustomer} = require('../controller/customer')
const {login} = require('../controller/Login')
// @route   POST api/customers
router.post('/register', register)

router.get('/verify-email-otp/:_otp/:email/:phone', verifyEmailOtpAndSendPhoneOtp)

router.get('/verify-phone-otp/:phone_otp/:phone', verifyPhoneOtp)

router.post('/resend-phone-otp/:phone', resendPhoneOtp)

router.post('/resend-email-otp/:email', resendEmailOtp)

router.put('/update/:customer_id', updateCustomer)

router.put('/update/:customer_id', login)



module.exports = router