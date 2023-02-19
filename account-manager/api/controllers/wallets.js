const Wallet = require('../models/wallet');
const Profile = require('../models/profile');
const Transaction = require('../models/transaction');

exports.wallets_get_wallet = (req, res, next) => {
    Profile.find({ 'email': req.email })
        .select('_id')
        .exec()
        .then(profile => {
            console.log('Profile: ' + profile[0]);
            if (profile) {
                Wallet.find({ profileID: profile[0]._id })
                    .select('value')
                    .exec()
                    .then(wallets => {
                        console.log('Wallet value: ' + wallets[0]);
                        if (wallets) {
                            res.status(200).json({
                                value: wallets[0].value
                            });
                        } else {
                            res.status(400).json({
                                message: 'Invalid Parameters.'
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: 'Internal Server Error' });
                    });
            } else {
                res.status(400).json({
                    message: 'Invalid Parameters.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
}

exports.wallets_get_wallet_next = (req, res, next) => {
    Transaction.find({ '_id': req.params.transactionID })
        .select('profileID')
        .exec()
        .then(transaction => {
            console.log('Transaction: ' + transaction[0]);
            if (transaction) {
                Wallet.find({ profileID: transaction[0].profileID })
                    .select('value _id')
                    .exec()
                    .then(wallets => {
                        console.log('Wallet value: ' + wallets[0]);
                        if (wallets) {
                            req.walletValue = wallets[0].value
                            req.walletID = wallets[0]._id
                            next();
                        } else {
                            res.status(400).json({
                                message: 'Invalid Parameters.'
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ message: 'Internal Server Error' });
                    });
            } else {
                res.status(400).json({
                    message: 'Invalid Parameters.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        });
}

exports.wallets_update_wallet = (req, res, next) => {
    if (req.paymentStatus === 100) {
        updateOps = {
            value: Number(req.walletValue) + Number(req.amount)
        }
        Wallet.updateOne({ _id: req.walletID }, { $set: updateOps })
            .exec()
            .then(result => {
                next();
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'Internal Server Error' });
            });
    } else {
        next();
    }
}
