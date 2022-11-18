require('dotenv').config()
const axios = require('axios')
const baseUrl = process.env.PAYSTACK_BASE_URL


const intializePayment =  ({amount, email}) => { 

      return  axios({
            method: 'post',
            url: `${baseUrl}/transaction/initialize`,
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            data: {
                amount: amount,
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