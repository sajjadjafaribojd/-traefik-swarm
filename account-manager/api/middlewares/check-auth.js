const request = require('request');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const auth_url = 'http://' + (process.env.AUTH_SERVER_ADDR || 'authN') + ':'
            + (process.env.AUTH_SERVER_PORT || '2000') + '/authentiq/v1/validate/token'
        var options = {
            headers: {
                'Authorization': token
            },
            url: auth_url,
            method: 'GET'
        };

        console.log(options)
        request(options, (err, resp, body) => {
            if (resp.statusCode === 200) {
                console.log(body);
                req.userID = JSON.parse(body).userID;
                req.email = JSON.parse(body).email;
                req.role = JSON.parse(body).role;
                next();

            } else {
                res.status(resp.statusCode).json(JSON.parse(body));
            }
        });

    } catch {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}