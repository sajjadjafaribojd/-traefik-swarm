const express = require('express');
const router = express.Router();

const TransactionsController = require('../controllers/transactions');
const validate = require('../middlewares/check-auth');

router.get('/', validate, TransactionsController.transactions_get_transaction);

module.exports = router;