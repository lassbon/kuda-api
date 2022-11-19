
const express = require('express')
const router = express.Router()

const { startFundWallet, completeFundWallet, getAccountStatement } = require('../controllers/wallet.controllers')
const { authorization } = require('../middlewares/authorization')


router.post('/fund-wallet/start', startFundWallet)

router.post('/fund-wallet/complete/:reference', authorization, completeFundWallet)

router.get('/account-statement', authorization, getAccountStatement)

module.exports = router

