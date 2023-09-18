const mongoose = require('mongoose');
// Helped to hash passwords user's
const bcrypt = require('bcryptjs');

const loginSchema = mongoose.Schema ({
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true } // in case of forgotten password maybe 
});

loginSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });

module.exports = mongoose.model('login', loginSchema);