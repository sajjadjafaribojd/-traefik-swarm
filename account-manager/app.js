const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const heartbeatRoutes = require('./api/routes/heartbeat');
const profileRoutes = require('./api/routes/profiles');
const walletRoutes = require('./api/routes/wallets');
const transactionRoutes = require('./api/routes/transactions');
const paymentRoutes = require('./api/routes/payments');

//Logging middleware
app.use(morgan('dev'));

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Preventing CORS (Cross-Origin Resource Sharing) errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTOINS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes which should handle requests
app.use('/accountico/heartbeat', heartbeatRoutes);
app.use('/accountico/profile', profileRoutes);
app.use('/accountico/wallet', walletRoutes);
app.use('/accountico/transaction', transactionRoutes);
app.use('/accountico/pay', paymentRoutes);

//Connect to MongoDB with mongoose
if (process.env.DB_USER && process.env.DB_PASS) {
    const connectionString = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS +
        '@' + (process.env.MONGO_SERVER_ADDR || 'mongo') + ':' +
        (process.env.MONGO_SERVER_PORT || '27017') + '/accountico?authSource=admin'
    console.log(connectionString);
    mongoose.connect(connectionString,
        {
            // useUnifiedTopology: false,
            useNewUrlParser: true,
            // useMongoClient: true
        })
        .catch(err => {
            console.log(err.message)
            process.exit(1)
        })
    mongoose.Promise = global.Promise;
} else {
    const connectionString = 'mongodb://' + (process.env.MONGO_SERVER_ADDR || 'mongo') + ':' +
        (process.env.MONGO_SERVER_PORT || '27017') + '/accountico'
    console.log(connectionString);
    mongoose.connect(connectionString,
        {
            useUnifiedTopology: false,
            useNewUrlParser: true,
            // useMongoClient: true
        })
        .catch(err => {
            console.log(err.message)
            process.exit(1)
        })
    mongoose.Promise = global.Promise;
}

//Error handling
app.use((req, res, next) => {
    const error = Error('Not found!');
    error.status = 404
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;