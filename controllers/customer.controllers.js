const verifyEmailOtp = (req, res) => { 

    const { email, _otp } = req.params
    try {
        otp.findAll({
            where: {
                email: email,
                otp: _otp
            }
        })
        .then((otpDataFetched) => {
            if (otpDataFetched.length == 0) throw new Error('Invalid OTP')
    
            const timeOtpWasSent = Date.now() - new Date(otpDataFetched[0].dataValues.createdAt)
        
            const convertToMin = Math.floor(timeOtpWasSent / 60000) // 60000 is the number of milliseconds in a minute

            if (convertToMin > 5) throw new Error('OTP has expired')

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

            sendEmail(email, 'Welcome', ` Hello  ${email},\n You are welcome to our digital platform. We hope banking with us will be a pleasant experience`)
            res.status(200).send({
                status: true,
                message: 'Email verification successful'
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




module.exports = { register, verifyEmailOtp }