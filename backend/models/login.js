const mongoose = require('mongoose');

const loginSchema = mongoose.Schema ({
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true } // in case of forgotten password maybe 
});

module.exports = mongoose.model('login', loginSchema);