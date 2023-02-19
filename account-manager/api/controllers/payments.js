exports.payments_zarinpal_payment = (req, res, next) => {
    try {
        var paymentLink = 'https://sandbox.zarinpal.com/pg/StartPay/' + req.paymentAuthority;
        console.log('Redirected to: ' + paymentLink)
        res.redirect(paymentLink);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

exports.payments_callback_payment = (req, res, next) => {
    try {
        // res.status(200).json();
        res.redirect(process.env.CALLBACK_URL);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}