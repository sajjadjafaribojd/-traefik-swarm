const mongoose = require('mongoose');
const joi = require('@hapi/joi');

const schemas = require('../utils/validationSchema');
const User = require('../models/user');
const config = require('../../config/config');
const lm = require('../static/logMessages');
const sn = require('../static/names');

exports.init = (app) => {
    const dbHost = process.env.AUTHENTIQ_DB_HOST || config.dbHost;
    const dbPort = process.env.AUTHENTIQ_DB_PORT || config.dbPort;
    const dbName = process.env.AUTHENTIQ_DB_NAME || config.dbName;
    const dbUsername = process.env.AUTHENTIQ_DB_USERNAME;
    const dbPassword = process.env.AUTHENTIQ_DB_PASSWORD;

    if (dbHost && dbPort && dbName && dbUsername && dbPassword) {
        dbURL = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;
        console.log(lm.connectToDBUserPass, dbURL);
    }
    else {
        dbURL = `mongodb://${dbHost}:${dbPort}/${dbName}`;
        console.warn(lm.connectToDBNoUserPass, dbURL);
    }


    const mongooseOpts = {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    mongoose.connect(dbURL, mongooseOpts)
        .then(async () => {
            console.log(lm.connectedToDB);
            createAdmin(app);
        })
        .catch(error => {
            console.error(lm.databaseConnection);
            process.exit(1);
        });
};

const createAdmin = async (app) => {
    const adminUsername = process.env.AUTHENTIQ_ADMIN_USERNAME || config.adminUsername;
    const adminPassword = process.env.AUTHENTIQ_ADMIN_PASSWORD || config.adminPassword;

    const {
        error
    } = joi.validate({ email: adminUsername, password: adminPassword }, schemas.register);

    if (error) {
        console.error(lm.createAdminError);
        process.exit(1);
    }


    const adminUser = new User({
        email: adminUsername,
        password: adminPassword,
        role: sn.adminRole,
        verified: true
    });
    const user = await User.getUserByEmail(adminUser.email);
    if (user) {
        User.changePassword(user, adminPassword, (err, usr) => {
            if (err || !usr) {
                console.error(lm.createAdminFailed);
                process.exit(1);
            }
            console.info(lm.adminUserExists, adminUsername);
            app.emit(sn.dbReady);
        });
    } else {
        console.info(lm.createAdminSuccess, adminUsername);
        User.createUser(adminUser, (err) => {
            if (err) {
                console.error(lm.createAdminFailed);
                process.exit(1);
            }
            app.emit(sn.dbReady);
        });
    }
};