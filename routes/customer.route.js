const express = require('express')
const router = express.Router()
const { register, verifyEmailOtpAndSendPhoneOtp,
        verifyPhoneOtp, resendPhoneOtp, resendEmailOtp,
    updateCustomer, getCustomerDetails, addBeneficiary, getAllBeneficiary, updateBeneficiary
} = require('../controllers/customer.controllers')
const { authorization } = require('../middlewares/authorization')


// @route   POST api/customers
router.post('/register', register)

router.get('/verify-email-otp/:_otp/:email/:phone', verifyEmailOtpAndSendPhoneOtp)

router.get('/verify-phone-otp/:phone_otp/:phone', verifyPhoneOtp)

router.post('/resend-phone-otp/:phone', resendPhoneOtp)

router.post('/resend-email-otp/:email', resendEmailOtp)

router.get('/profile', authorization, getCustomerDetails)

router.put('/update', authorization, updateCustomer)

router.post('/beneficiary/add', authorization, addBeneficiary)

router.get('/beneficiaries', authorization, getAllBeneficiary)

router.put('/beneficiary/:beneficiary_id', authorization, updateBeneficiary)


module.exports = router