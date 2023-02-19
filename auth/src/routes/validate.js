const express = require('express');
const router = express.Router();

const jwt = require('../jwt/jwtService');
const User = require('../models/user');

const rm = require('../static/responseMessages');
const sn = require('../static/names');

router.get('/token', (req, res, next) => {
    const token = req.get(sn.authorizationName).split(' ')[1]; // Extract the token from Bearer
    User.getUserByEmail(jwt.decode(token).payload.email).then((user) => {
        if (!user) {
            return res.status(rm.emailNotFound.code).json(rm.emailNotFound.msg);
        }

        var body = {
            [sn.message]: rm.loggedIn.msg.message,
            [sn.userID]: user._id,
            [sn.email]: user.email
        };
        return res.status(rm.loggedIn.code).json(body);
    }).catch((err) => {
        return next(err);
    });
});

module.exports = router;