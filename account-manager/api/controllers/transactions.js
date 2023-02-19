const mongoose = require('mongoose');

const Transaction = require('../models/transaction');
const Profile = require('../models/profile');

exports.transactions_get_transaction = (req, res, next) => {
    Profile.find({ 'email': req.email })
        .select('_id')
        .exec()
        .then(profile => {
            console.log('Found from Profile: ' + profile[0]);
            if (profile) {
                Transaction.find({ profileID: profile[0]._id })
                    .select('_id profileID createdAt modifiedAt amount orderID statusCode refID')
                    .exec()
                    .then(transactions => {
                        console.log('Found from Transaction: ' + transactions);
                        if (transactions) {
                            res.status(200).json(transactions);
                        } else {
                            res.status(400).json({
                                message: 'Invalid Parameters.'
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    });
            } else {
                res.status(400).json({
                    message: 'Invalid Parameters.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
}

exports.transactions_insert_transaction = (req, res, next) => {
    Profile.find({ 'email': req.email })
        .select('_id')
        .exec()
        .then(profile => {
            console.log('Found from Profile: ' + profile[0]);
            if (profile) {
                var transaction = new Transaction({
                    _id: new mongoose.Types.ObjectId(),
                    profileID: profile[0]._id,
                    createdAt: new Date().getTime(),
                    amount: '10000', //from Trade Management service (orderID)
                    orderID: req.body.orderID
                });
                transaction
                    .save()
                    .then(result => {
                        console.log(result);
                        if (result) {
                            req.transactionID = transaction._id;
                            next();
                        } else {
                            res.status(400).json({
                                message: 'Invalid Parameters.'
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            message: 'Internal Server Error'
                        });
                    });
            } else {
                res.status(400).json({
                    message: 'Invalid Parameters.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
}
exports.transactions_update_transaction = (req, res, next) => {
    var updateOps = {
        modifiedAt: new Date().getTime(),
        statusCode: req.paymentStatus,
        refID: req.paymentRefID
    }
    console.log(updateOps);
    Transaction.updateOne({ _id: req.params.transactionID }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            if (result) {
                next();
            } else {
                res.status(400).json({
                    message: 'Invalid Parameters.'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
}
