const mongoose = require('mongoose');

const Profile = require('../models/profile');
const Wallet = require('../models/wallet');

exports.profiles_create_profile = (req, res, next) => {
    const profile = new Profile({
        _id: new mongoose.Types.ObjectId(),
        userID: req.userID,
        email: req.body.email,
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        nationalCode: req.body.nationalCode,
        address: req.body.address,
        postalCode: req.body.postalCode
    });
    profile
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                //token: req.token
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });

    const wallet = new Wallet({
        _id: new mongoose.Types.ObjectId(),
        profileID: profile._id,
        value: 0
    });
    wallet
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
}

exports.profiles_update_profile = (req, res, next) => {
    var invalid = false;
    updateOps = {
        name: ((req.body.name == null) ? invalid = true : req.body.name),
        phoneNo: ((req.body.phoneNo == null) ? invalid = true : req.body.phoneNo),
        nationalCode: ((req.body.nationalCode == null) ? invalid = true : req.body.nationalCode),
        address: ((req.body.address == null) ? invalid = true : req.body.address),
        postalCode: ((req.body.postalCode == null) ? invalid = true : req.body.postalCode)
    }
    if (invalid === true) {
        res.status(400).json({
            message: 'Invalid Parameters'
        });
        return;
    }
    Profile.updateOne({ email: req.email }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                userID: req.userID,
                email: req.email,
                name: req.body.name,
                phoneNo: req.body.phoneNo,
                nationalCode: req.body.nationalCode,
                address: req.body.address,
                postalCode: req.body.postalCode
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
}

exports.profiles_get_profile = (req, res, next) => {
    Profile.find({ 'email': req.email })
        .select('_id userID email name phoneNo nationalCode address postalCode')
        .exec()
        .then(profile => {
            console.log('From database:' + profile[0]);
            if (profile) {
                res.status(200).json(profile[0]);
            } else {
                res.status(404).json({
                    message: 'Email Not Found'
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