const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const db = require('./scripts/database');
db.init(app);

const logger = require('morgan');
app.use(logger('combined'));


const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const validateRouter = require('./routes/validate');
app.use('/authentiq/v1/', indexRouter);

const config = require('../config/config');
const tokenResponse = require('./utils/parseToken').tokenResponse;
const rm = require('./static/responseMessages');
const sn = require('./static/names');

// middleware responsible for checking if token exists (in needed routes)
// routers that do not require token should be declared before this middleware
app.use(async (req, res, next) => {
    // TODO: Modify the for behavior to add middleware to each API
    // check if the request is included in checking
    for (let index = 0; index < config.AuthenticationList.length; index++) {
        const {
            method,
            url
        } = config.AuthenticationList[index];

        if (method === req.method && url === req.path) {
            if (!req.headers.authorization) {
                return res.status(rm.noCredentials.code).json(rm.noCredentials.msg);
            } else {
                const token = req.get(sn.authorizationName).split(' ')[1]; // Extract the token from Bearer
                if(!await tokenResponse(token, req, res, next)) {
                    return;
                }
                else {
                    break;
                }
            }
        }
    }
    next();
});

app.use('/authentiq/v1/validate', validateRouter);
app.use('/authentiq/v1/user', userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    res.sendStatus(404);
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    if(process.env.NODE_ENV !== sn.production) {
        return res.contentType('text').status(err.status || 500).send(err.stack);
    }
    return res.status(err.status || rm.internalServerError.code).json(rm.internalServerError.msg);
});

module.exports = app;