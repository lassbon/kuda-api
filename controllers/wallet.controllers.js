const { wallet , transaction} = require('../models')
const { v4: uuidv4 } = require('uuid')
const { initializePayment, verifyPayment } = require('../services/paystack')

const createWallet = (wallet_type, currency='NGN', customer_id) => {

    return wallet.create({
        wallet_id: uuidv4(),
        wallet_type: wallet_type, //1 = spend, 2 = save, 3 = borrow
        balance: 0.00,
        currency: currency,
        customer_id: customer_id
    })
}



const startFundWallet = async (req, res) => { 

    const { email, amount } = req.body
    try {
        const startPayment = await initializePayment(amount, email)
        res.status(200).json({
            status: true,
            message: 'Payment initialized',
            data: startPayment.data.data
        })
    

    } catch (error) {
    
        res.status(400).json({
            status: false,
            message: error.message
        })
    
    }


   


}

const completeFundWallet = async (req, res) => { 

    const { reference } = req.params
    try {
        const verifyPaymentReference = await verifyPayment(reference)
        const paystackStatus = verifyPaymentReference.data.data.status

        if (paystackStatus === 'success') { 
            //transaction was successful
           /*
                todo: update wallet balance
                1. create trasnaction record for this transaction
                2. update wallet balance to the funded amount

            */




        } else {
            //transaction was not successful
            throw new Error("Sorry, this transaction was not successful")
        }

    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        })
    }

}


module.exports = { createWallet , startFundWallet}