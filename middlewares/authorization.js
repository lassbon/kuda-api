require('dotenv').config()
const jwt = require('jsonwebtoken')


const authorization = async(req, res, next) => {

    const token = req.headers.token

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) //err, decoded
        req.userData = decoded
        next()
    } catch (e) {
        console.log("errr: ", e)
        return res.status(401).json({
            status: false,
            message: "Unauthorized"
        })
    }


}


module.exports = { authorization }