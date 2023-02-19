const request = require('request');

module.exports = (req, res, next) => {
    try {
        const auth_url = 'http://' + (process.env.AUTH_SERVER_ADDR || 'authN') + ':'
            + (process.env.AUTH_SERVER_PORT || '2000') + '/authentiq/v1/user/register'
        var options = {
            url: auth_url,
            json: {
                'email': req.body.email,
                'password': req.body.password
            },
            method: 'POST'
        };
        console.log(options)
        request(options, (err, resp, body) => {
            if (resp.statusCode === 201) {
                console.log(body);
                // req.token = body.token;
                req.userID = body.user.userID;
                next();

            } else {
                console.log(resp);
                res.status(resp.statusCode).json(body);
            }
        });

    } catch {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}