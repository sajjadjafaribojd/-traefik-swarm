const express = require('express');
const router = express.Router();

const WalletsController = require('../controllers/wallets');
const validate = require('../middlewares/check-auth');

router.get('/', validate, WalletsController.wallets_get_wallet);

module.exports = router;