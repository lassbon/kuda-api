const { wallet , transaction } = require('../models')
const { v4: uuidv4 } = require('uuid')
const { initializePayment, verifyPayment } = require('../services/paystack')
const { ref } = require('joi')

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

    const { reference } = req.params //get the payment transaction reference issued from paystack when the payment was initialized
    const { customer_id } = req.body.userData
    try {
        const verifyPaymentReference = await verifyPayment(reference) //verify the payment reference, making a call to paystack api in ther services
        const paystackResponse = verifyPaymentReference.data //get the response from axios call to paystack NB: axios returns a data object

        if (paystackResponse.status === false) { //check the status of the response from paystack, true or false (for success or failure)
            throw new Error("Sorry, this transaction referece is invalid") //if the status is false, throw an error with the message from paystack
        }

        if (paystackResponse.data.status != 'success') {
            throw new Error("Sorry, transaction was not completed")
        }
        //transaction successful, update the wallet balance
        const customerWalletDetails = await wallet.findOne({ where: { customer_id: customer_id, wallet_type: 1 } }) //get the customer wallet details
        const oldBalance =  customerWalletDetails.balance //get the old balance of the wallet
        const newBalance = parseFloat(oldBalance) + parseFloat(paystackResponse.data.amount) //add the old balance to the new balance
      
        await transaction.create({
            transaction_id: reference, //use the paystack transaction reference as the transaction id
            customer_id: customer_id,
            transaction_type: 1, //1 = credit, 2 = debit
            transaction_description: `Deposit of #${paystackResponse.data.amount} to wallet`,
            balance_before: parseFloat(oldBalance),
            balance_after: parseFloat(newBalance),
            transaction_amount: parseFloat(paystackResponse.data.amount)


        })

        await wallet.update({
            balance: parseFloat(newBalance)
        }, {
            where: { wallet_id: customerWalletDetails.dataValues.wallet_id }
        }) //update the wallet balance with the amount funded

       

        res.status(200).json({
            status: true,
            message: "Your wallet has been funded successfully"
        })


    } catch (error) {
      
        res.status(400).json({
            status: false,
            message: "Sorry An Error occured, try again later"
        })
    }

}


module.exports = { createWallet , startFundWallet, completeFundWallet}