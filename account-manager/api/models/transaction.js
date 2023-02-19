const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profileID: { type: mongoose.Schema.Types.ObjectId, ref:'Profile', required: true },
    createdAt: { type: Date, required: true },
    modifiedAt: Date,
    amount: { type: Number, required: true },
    orderID: { type: mongoose.Schema.Types.ObjectId, required: true },
    statusCode: String,
    refID: String,
});

module.exports = mongoose.model('Transaction', transactionSchema);