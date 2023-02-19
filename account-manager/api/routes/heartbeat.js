const express = require('express');
const Profile = require('../models/profile');
const router = express.Router();

router.get('/', (req, res, next) => {

    Profile.find().select('_id').exec().then(profile => {
        if (profile) {
            res.status(200).json({
                message: 'Account Management is up and running...'
            })
        }
    })
        .catch(err => {
            console.log(err.message);
            process.exit(1);
        })
});

module.exports = router;