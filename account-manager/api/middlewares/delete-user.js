const request = require('request');

module.exports = (req, res, next) => {
    try {
        const auth_url = 'http://' + (process.env.AUTH_SERVER_ADDR || 'authN') + ':'
            + (process.env.AUTH_SERVER_PORT || '2000') + '/authentiq/v1/user/delete'
        var options = {
            url: auth_url,
            headers: {
                'Authorization': 'Bearer ' + req.token
            },
            json: {
                'password': req.body.password
            },
            // method: 'DELETE'
        };
        console.log(options)
        request.delete(options, (err, resp, body) => {
            if (resp.statusCode === 200) {
                console.log(body);

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