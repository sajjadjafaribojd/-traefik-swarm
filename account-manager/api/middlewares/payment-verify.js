const soap = require('soap');

module.exports = (req, res, next) => {
    try {
        const amount = '10000'; //from Trade Management service (orderID)
        const payment_url = process.env.PAYMENT_URL
            || 'https://sandbox.zarinpal.com/pg/services/WebGate/wsdl';
        var options = {
            MerchantID: process.env.MERCHANT_ID || 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
            Authority: req.query.Authority,
            Amount: amount
        };
        console.log(options)
        soap.createClient(payment_url, (err, client) => {
            client.PaymentVerification(options, (err, result) => {
                var body = JSON.parse(JSON.stringify(result));
                console.log(body);
                req.amount = amount;
                req.paymentStatus = body.Status;
                req.paymentRefID = body.RefID;
                next();
            });
        });

    } catch {
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}