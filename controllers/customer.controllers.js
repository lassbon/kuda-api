
const Customer = require('../models/customer.model');

const register = (req, res) => { 
    // Do something


    res.status(200).json(
        {
            status: true,
            message: 'Customer registration successful'
        }
    )
}





module.exports = { register }