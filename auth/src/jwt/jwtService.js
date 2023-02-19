const fs = require('fs');
const jwt = require('jsonwebtoken');

// use 'utf8' to get string instead of byte array  (512 bit key)
const privateKEY = fs.readFileSync('./src/jwt/private.key', 'utf8');
const publicKEY = fs.readFileSync('./src/jwt/public.key', 'utf8');

const authentiqServerIssuer = "Authentiq Server";
const authentiqClientIssuer = "Authentiq Client";
const validityPeriod = "1d";
const signAlgorithm = "RS256";

module.exports = {
    sign: (payload, $Options) => {
        const signOptions = {
            issuer: authentiqServerIssuer,
            subject: $Options.subject,
            audience: authentiqClientIssuer,
            expiresIn: validityPeriod,
            algorithm: signAlgorithm
        };
        return jwt.sign(payload, privateKEY, signOptions);
    },

    verify: (token, $Option) => {
        const verifyOptions = {
            issuer: authentiqServerIssuer,
            subject: $Option.subject,
            audience: authentiqClientIssuer,
            expiresIn: validityPeriod,
            algorithm: [signAlgorithm]
        };

        try {
            return jwt.verify(token, publicKEY, verifyOptions);
        } catch (err) {
            return false;
        }
    },

    decode: (token) => {
        return jwt.decode(token, {
            complete: true
        }); // returns null if token is invalid
    }
}