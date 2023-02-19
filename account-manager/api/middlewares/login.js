const request = require('request');

module.exports = (req, res, next) => {
    try {
        const auth_url = 'http://' + (process.env.AUTH_SERVER_ADDR || 'authN') + ':'
            + (process.env.AUTH_SERVER_PORT || '2000') + '/authentiq/v1/user/login'
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
            if (resp.statusCode === 200) {
                console.log({ token: body.token });
                req.token = body.token;
                next();

            } else {
                console.log(resp);
                res.status(resp.statusCode).json(JSON.parse(body));
            }
        });

    } catch {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}