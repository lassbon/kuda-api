
const Customer = require('../models/customer');

const register = async (req, res) => { 
    // Do something


    res.status(200).json(
        {
            status: true,
            message: 'Customer registration successful'
        }
    )
}





module.exports = { register }