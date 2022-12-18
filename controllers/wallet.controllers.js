const { wallet , transaction } = require('../models')
const { v4: uuidv4 } = require('uuid')
const { initializePayment, verifyPayment, getBank } = require('../services/paystack')
const { ref } = require('joi')
const { Op } = require('sequelize')

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
    const { customer_id } = req.body.userData //comes from the authorization middleware
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
        const newBalance = parseFloat(oldBalance) + (parseFloat(paystackResponse.data.amount) / 100) //add the old balance to the new balance
      
        await transaction.create({
            transaction_id: reference, //use the paystack transaction reference as the transaction id
            customer_id: customer_id,
            transaction_type: 1, //1 = credit, 2 = debit
            transaction_description: `Deposit of #${paystackResponse.data.amount / 100} to wallet`,
            balance_before: parseFloat(oldBalance),
            balance_after: parseFloat(newBalance),
            transaction_amount: parseFloat(paystackResponse.data.amount / 100)


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

const getAccountStatement = async (req, res) => { 

    const { customer_id } = req.body.userData
    const todaysDate = new Date()
    const month = todaysDate.getMonth() + 1
    const year = todaysDate.getFullYear()
    const startDate = `${year}-${month}-01`
    const endDate = `${year}-${month}-31`

    const customStartDate = req.query.startDate || startDate
    const customEndDate = req.query.endDate || endDate
    try {
        const transactionData = await transaction.findAll({
            where: 
            {
                customer_id: customer_id,
                createdAt: {
                    // [Op.between]: [startDate, endDate]
                    [Op.gte]: customStartDate,
                    [Op.lte]: customEndDate
                }
            },
             order: [['createdAt', 'desc']]
        })
        
        res.status(200).json({
            status: true,
            message: "Account statement retrieved successfully",
            data: transactionData
        })
     }catch(error) {

     }


}


const getAllBanks = async (req, res) => { 

    try {
        const allBanks = await getBank() //from the paystack service
        console.log("allBanks", allBanks)
        res.status(200).json({
            status: true,
            message: "All banks retrieved successfully",
            data: allBanks.data.data //get the data object from the axios response
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Sorry, an error occured, try again later"
        })
    }

}

module.exports = { createWallet, startFundWallet, completeFundWallet, getAccountStatement, getAllBanks }


