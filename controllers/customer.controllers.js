require('dotenv').config()
const { registerValidation }  = require('../validations/register.validation')
const { customer, otp } = require('../models');
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid')
const { hashMyPassword, generateOtp } = require('../utils')
const { sendEmail } = require('../services/email')
const { sendSms } = require('../services/sms')





const register = (req, res) => { 
    // joi validation
    const { error, value } = registerValidation(req.body)

    if (error != undefined) {
      
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    }else{
    
    const { surname, othernames, email, phone, password, repeat_password } = req.body;
        const customer_id = uuidv4()
        const _otp = generateOtp()
    try {

    customers.findAll({
        where: {
            [Op.or]: [
                { email: email },
                { phone_number: phone }
            ]
        }
    })
    .then((data) => {
        if (data.length > 0) throw new Error('Email or phone number already exist')

        return hashMyPassword(password) //[hash, salt]

    })
    .then(([hash, salt]) => {

        return customer.create({
            customer_id: customer_id,
            lastname: surname,
            othernames: othernames,
            email: email,
            phone_number: phone,
            password_hash: hash,
            password_salt: salt,
        })

    })
    .then((insertIntoOtpTable) => {

     
        return otp.create({
           
            otp: _otp,
            email: email,
            phone: phone,
            
        })

    })
    .then((data3) => {
        
        sendEmail(email, 'OTP', ` Hello  ${surname} ${othernames},\n Your OTP is ${_otp}`)

        res.status(200).send({
            status: true,
            message: 'Registration successful, An otp has been sent to your email'
        })

    })
    .catch((err) => {
           
        res.status(400).json({
            status: false,
            message: err.message || "Some error occurred while creating the Customer."
        })

    })

    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message || "Some error occurred while creating the Customer."
        })
    }
}
}


const verifyEmailOtpAndSendPhoneOtp = (req, res) => { 

    const phone_otp = generateOtp()

    const { email, phone, _otp } = req.params
    try {
        otp.findAll({
            where: {
                email: email,
                otp: _otp
            },
            attributes: [ 'otp', 'email', 'phone', 'createdAt'], 
        })
        .then((otpDataFetched) => {
            if (otpDataFetched.length == 0) throw new Error('Invalid OTP')
    
            console.log("otpdataFetched: ", otpDataFetched[0])

            const timeOtpWasSent = Date.now() - new Date(otpDataFetched[0].dataValues.createdAt)
        
            const convertToMin = Math.floor(timeOtpWasSent / 60000) // 60000 is the number of milliseconds in a minute

            if (convertToMin > process.env.OTPExpirationTime) throw new Error('OTP has expired')

            return customer.update({ is_email_verified: true }, {
                where: {
                  email: email
                }
              })
            

        
        })
        .then((emailverifiedData) => { 
            return otp.destroy({
                where: {
                    otp: _otp,
                    email: email
                }
            })
        })
        .then((data3) => { 

            return otp.create({
                otp: phone_otp,
                phone: phone,
                email: email
            })
           
        })
        .then((data4) => {
            
                   //send an otp to the phone number
            sendSms(phone, `Hello, your otp is ${phone_otp}`)
            sendEmail(email, 'Email Verification Successful', ` Hello  ${email},\n Thank you for verifying your email. An otp has been sent to your phone number, kindly use this otp to also verify your phone number`)
         
        })
        .then((data5) => {
                res.status(200).send({
                    status: true,
                    message: 'Email verification successful, An otp has been sent to your phone number'
                })
        })
        .catch((err) => {
            res.status(400).json({
                status: false,
                message: err.message || "Some error occurred while verifying OTP."
            })
        })
        
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.message || "Some error occurred while verifying OTP."
        })

    }

}



const verifyPhoneOtp = (req, res) => { 

    const { phone, phone_otp } = req.params
    try {
        otp.findAll({
            where: {
                phone: phone,
                otp: phone_otp
            },
            attributes: [ 'otp', 'phone', 'createdAt'], 
        })
        .then((otpDataFetched) => {
            if (otpDataFetched.length == 0) throw new Error('Invalid OTP')

            const timeOtpWasSent = Date.now() - new Date(otpDataFetched[0].dataValues.createdAt)
        
            const convertToMin = Math.floor(timeOtpWasSent / 60000) // 60000 is the number of milliseconds in a minute

            if (convertToMin > process.env.OTPExpirationTime) throw new Error('OTP has expired')

            return customer.update({ is_phone_number_verified: true }, {
                where: {
                    phone_number: phone
                }
              })
            

        
        })
        .then((phoneverifiedData) => { 
            return otp.destroy({
                where: {
                    otp: phone_otp,
                    phone: phone
                }
            })
        })
        .then((data5) => {
                res.status(200).send({
                    status: true,
                    message: 'Phone successfuly verified. Welcome onboard'
                })
        })
        .catch((err) => {
            res.status(400).json({
                status: false,
                message: err.message || "Some error occurred"
            })
        })
        
    } catch (err) {
        res.status(400).json({
            status: false,
            message: err.message || "Some error occurred"
        })

    }

}



module.exports = { register, verifyEmailOtpAndSendPhoneOtp, verifyPhoneOtp }