const mongoose = require('mongoose');

const customerSchema = mongoose.Schema ({
    name: { type: String, required: true },
    firstname: { type: String, required: true },
    civility: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true }
});

module.exports = mongoose.model('customer', customerSchema); 
