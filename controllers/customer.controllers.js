const {registerValidation}  = require('../validations/register.validation')
const { customer, otp } = require('../models');
const { Op } = require("sequelize");
const { v4: uuidv4 } = require('uuid')
const { hashMyPassword, generateOtp } = require('../utils')
const { sendEmail } = require('../services/email')
const { sendSms }  = require(`../services/email`)






const register = (req, res) => { 
    // Do something
    const { error, value } = registerValidation(req.body)


   
    if (error != undefined) {
      
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    }else{
    
    const { surname, othernames, email, phone, password, repeat_password } = req.body;
    const customer_id = uuidv4()
    //gconst _otp = generateOtp
        
    try {
        
    customer.findAll({
        where: {
          [Op.or]: [
            { email: email },
            { phone_number: phone }
          ]
        },
        attributes: ['customer_id','title', 'email', 'phone_number']
    })
    .then((data) => {
       if(data.length > 0) throw new Error('Email or phone number already exist')
      
       return hashMyPassword(password) //[hash, salt]

    })
    .then((hash,salt) => {
    
        return   customer.create({
                customer_id: customer_id,
                lastname:  surname,
                othernames: othernames, 
                email: email, 
                phone_number: phone, 
                password_hash:hash,
                password_salt:salt,
            })

    })
    .then((insertIntoOtpTable) => {

        const _otp = generateOtp()
        return  otp.create({
            customer_id: customer_id,
            otp: _otp,
            email:  email,
            phone: phone, 
            email: email
        })

    })
    .then((data3) => {

        res.status(200).send({
            status: true,
            message: 'Registration successful'
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





module.exports = { register , verifyEmailOtp , sendEmail}