const express = require('express');
const router = express.Router();

const PaymentsController = require('../controllers/payments');
const TransactionController = require('../controllers/transactions');
const WalletController = require('../controllers/wallets');
const validate = require('../middlewares/check-auth');
const paymentRequest = require('../middlewares/payment-request');
const paymentVerify = require('../middlewares/payment-verify');

router.post('/', validate, TransactionController.transactions_insert_transaction, paymentRequest,
    PaymentsController.payments_zarinpal_payment);
router.get('/callback/:transactionID', paymentVerify,
    TransactionController.transactions_update_transaction, 
    WalletController.wallets_get_wallet_next, 
    WalletController.wallets_update_wallet, PaymentsController.payments_callback_payment);

module.exports = router;