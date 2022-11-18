
const express = require('express')
const router = express.Router()

const { startFundWallet } = require('../controllers/wallet.controllers')
const { authorization } = require('../middlewares/authorization')


router.post('/fund-wallet', startFundWallet)


module.exports = router

