require('dotenv').config()
const axios = require('axios')
const baseUrl = process.env.PAYSTACK_BASE_URL


// const intializePayment =  ({amount, email}) => {  destructed the email and amount from the req.body, but femisola preffered it the other way
   
const initializePayment = (amount, email) => { 
    console.log(" ia ma here")
      return  axios({
            method: 'post',
            url: `${baseUrl}/transaction/initialize`,
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            data: {
                amount: amount * 100, //amount has to be in kobo, according to paystack
                email: email
            }
        })
}



const verifyPayment = (ref) => { 

    return axios({
        method: 'get',
        url: `${baseUrl}/transaction/verify/${ref}`,
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
        },
    })
}



module.exports = { initializePayment, verifyPayment }