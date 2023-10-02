const mongoose = require('mongoose');

const orderSchema = mongoose.Schema ({
    number: { type: Number, required: true },
    numberOfItems: { type: Number, required: true },
    totalAmount: { type: Number, required: true }
    
});

module.exports = mongoose.model('orderModel', orderSchema);
