const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    profileID: { type: mongoose.Schema.Types.ObjectId, ref:'Profile', required: true },
    value: { type: Number, required: true }
});

module.exports = mongoose.model('Wallet', walletSchema);